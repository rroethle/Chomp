

 $(document.body).on("click","#deleteQuestion",function(){
	// on click retrieve the div question ID
		var qID = $(this).closest('div').attr('id');
	// retrieve number of div about to be removed
	var qNum = qID.slice(1);
	//remove the div ID with that question number and the sidebar div
	$('#'+qID).remove();
	$('#'+qID+"-sidebar").remove();
	// determine the new number of child div's remaining in build
	var qLength = $('#build').children('div').length;
	// loop through the remaining div's and sidebar div's and re-assign div id's based on new order
	// start at removed div number
	for (i=qNum; i<=qLength;i++){
		//determine variables to use for number replacement, old div is 1 plus new ID.
		var newID = "Q"+i
		var oldIDNum = Number(i)+1
		
		var oldID = "Q"+oldIDNum // used to generate custom regular expression to find html tags
		var oldQuestion = "Question "+oldIDNum // used to generate custom regular expression to find question text
		var newQuestion = "Question "+i
		
		oldBuild = $('#build').html() // generate a copy of the current html
		//custom regular expressions. "g" used to make it global and replace all the copies.
		var reOld = new RegExp(oldID,"g");
		var reQuestion = new RegExp(oldQuestion,"g")
		 $('#'+oldID).attr('id',newID);
		 $('#'+oldID+'Text').attr('id',newID+'Text')
		 $('#'+oldID+'SubDiv').attr('id',newID+'SubDiv')
		 $('#'+oldID+'\\.answer\\.type').attr('id',newID+'.answer.type')
		 $('#'+oldID+'\\.answer\\.text').attr('id',newID+'.answer.text')
		 $('#'+oldID + '\\.answer\\.options\\.min').attr('id',newID + '.answer.options.min')
		 $('#'+oldID + '\\.answer\\.options\\.max').attr('id',newID + '.answer.options.max')
		 $('#'+oldID + '\\.inputValue').attr('id',newID + '.inputValue')
		 $('.'+oldID + '\\.answer\\.options\\.input').attr('class',newID + '.answer.options.input')
		
		findAndReplaceDOMText(document.getElementById('build'),{
			find: oldQuestion,
			replace: newQuestion
			}
		);

		//repeat for sidebar div
		var sideBarOld = $('#sidebar').html()
		sideBarNew = sideBarOld.replace(reOld,newID)
		sideBarNew = sideBarNew.replace(reQuestion,newQuestion)
		$('#sidebar').html(sideBarNew)
	}

	

	
});

$("#add").on("click", function() {
	var id = $('div').last().attr('id')
	var Qid = id.substr(0, id.indexOf('.'));
	var newQid = Number(Qid.slice(1)) + 1
	var sidebar = generateSideBar(newQid,Qid)
	html = displayQuestion(newQid)
	$("#build").append(html);
	$("#sidebar").append(sidebar);
});



function generateSideBar(question, Qid){
	var html = '<div id = "Q' + question + '-sidebar"><a href="#' +Qid+ '">Question ' + question + '</a><div><br>';
	return html;
}


/* CLICK TO CHANGE TITLE */
$("#survey_title").click(function() {
	$("#build_title").html("<input type='text' width='100' id='title_input' placeholder='click to add title'>");
	$("#title_input").change(function() {
		var title = ($("#title_input").val());	
		$("#build_title").html("<button id='set_title'>" +title+ "</button>");
		$("#sidebar p").html('<p id="surveyTitle">' +title+ "</p>")
	});
});

/* NEW SURVEY CLICK TO INDEX.HTML */
$("#new").click(function() {
	window.location = "index.html";
});