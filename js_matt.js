

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
	for (i=qNum; i<=qLength+1;i++){
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
		newBuild = oldBuild.replace(reOld,newID)
		newBuild = newBuild.replace(reQuestion,newQuestion)
		//update document with replaced content
		$('#build').html(newBuild)
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



function generateSideBar(question,Qid){
	var html = '<div id = "Q' + question + '-sidebar">Question ' + question + '<div><br>';
	return html;
}
