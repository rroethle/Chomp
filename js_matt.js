/* delete and add question for editing or creating a new survey
 * title changes and redirection to survey title functionality accounted for in this script.
*/

// on click, the closest div id is found, and the question is removed in build and on sidebar.
// div id's are re-assigned and question labels are re-created 
 $(document.body).on("click","#deleteQuestion",function(){
	
	var qID = $(this).closest('div').attr('id'); // on click retrieve the div question ID
	var qNum = qID.slice(1); // retrieve number of div about to be removed
	$('#'+qID).remove(); //remove the div ID with that question number and the sidebar div
	$('#'+qID+"-sidebar").remove();
	var qLength = $('#build').children('div').length; // determine the new number of child div's remaining in build
	console.log(qLength)
	// loop through the remaining div's and sidebar div's and re-assign id's based on new order
	// start at removed div number
	for (i=qNum; i<=qLength;i++){
		//determine variables to use for number replacement, old div is 1 plus new ID.
		var newID = "Q"+i;
		var oldIDNum = Number(i)+1;
		
		var oldID = "Q"+oldIDNum; // used to generate custom regular expression to find html tags
		var oldQuestion = "Question "+oldIDNum; // used to generate custom regular expression to find question text
		var newQuestion = "Question "+i;
		
		//custom regular expressions. "g" used to make it global and replace all the copies.
		// used to update sidebar.
		var reOld = new RegExp(oldID,"g");
		var reQuestion = new RegExp(oldQuestion,"g");
		
		// the attr calls below replace the old id's with the new id's for each answer type.
		// when adding select cases to our answer types, we need to update these attr calls to account 
		// for deletions.
		 $('#'+oldID).attr('id',newID);
		 $('#'+oldID+'Text').attr('id',newID+'Text');
		 $('#'+oldID+'SubDiv').attr('id',newID+'SubDiv');
		 $('#'+oldID+'\\.answer\\.type').attr('id',newID+'.answer.type');
		 $('#'+oldID+'\\.answer\\.text').attr('id',newID+'.answer.text');
		 $('#'+oldID + '\\.answer\\.options\\.min').attr('id',newID + '.answer.options.min');
		 $('#'+oldID + '\\.answer\\.options\\.max').attr('id',newID + '.answer.options.max');
		 $('#'+oldID + '\\.inputValue').attr('id',newID + '.inputValue');
		 $('.'+oldID + '\\.answer\\.options\\.input').attr('class',newID + '.answer.options.input');
		
		// uses jquery plugin findAndReplaceDOMText to change the text to reflect deleted elements.
		findAndReplaceDOMText(document.getElementById('build'),{
			find: oldQuestion,
			replace: newQuestion
			}
		);

		//repeat for sidebar div
		var sideBarOld = $('#sidebar').html();
		sideBarNew = sideBarOld.replace(reOld,newID);
		sideBarNew = sideBarNew.replace(reQuestion,newQuestion);
		$('#sidebar').html(sideBarNew);
	};
});

/* when add question is clicked, retrieves the last div id, adds 1, and adds a new question and sidebar element
 * to the existing survey.
*/
$("#add").on("click", function() {
	if (questionCheck == false) {
		var id = $('div').last().attr('id'); // id of last div
		var Qid = id.substr(0, id.indexOf('.')); // id with "Q" in front
		var newQid = Number(Qid.slice(1)) + 1; // adds 1 to last id.
		var sidebar = generateSideBar(newQid,Qid);
		html = displayQuestion(newQid); // creates the html for the new question.
		$("#build").append(html);
		$("#sidebar").append(sidebar);
	};
});




/* CLICK TO CHANGE TITLE */
$("#build_title").on("click", "#survey_title",function() {
	var build_previous = $("#build_title").html()
	var sidebar_previous = $("#sidebar p").html()
	$("#build_title").html("<input type='text' width='100' id='title_input' placeholder='click to add title'>");
	$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
        $("#build_title").html(build_previous)
    }
});
	$("#title_input").change(function() {
		var title = ($("#title_input").val());
		existCheck = false;
		$.get(("http://localhost:5000/api/read/survey_templates"), function (data, status) {
			A = data;
			currentSurveyTitle = title
			console.log(currentSurveyTitle)
			A = JSON && JSON.parse(A) || $.parseJSON(A);
			ALength = A.length;
			for (var i = 0; i< ALength; i++){
				var checkTitle = A[i]["surveyTitle"]
				if (checkTitle == currentSurveyTitle){
					console.log("Hit")
					existCheck = true;
				}
			}
			if (existCheck === false){
				$("#build_title").html("<button id='survey_title'>" +title+ "</button><div id='build_area'></div>");
				$("#sidebar p").html('<p id="surveyTitle">' +title+ "</p>")
		}
			else{
				alert("Template already exists, Please enter another title")
				var build_previous = $("#build_title").html()
		}
			
		});
		
	});
});

/* NEW SURVEY CLICK TO INDEX.HTML */
$("#new").click(function() {
	questionCheck = false;
	window.location = "index.html";
});