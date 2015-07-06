/* js_load handles the display of surveys to load (load click), the click response to when a user
 * clicks on an existing survey (a click), and when a user would like to delete a survey (deleteSurvey click)
*/

var titlesCollection = []; //collects list of titles in survey_templates database
var idCollection = []; //collects list of id's in survey_templates database
var loadCheck = false; // flag used to see if the "load" action can fire. False means it can.
var questionCheck = false; // flag used to see if a new question can be added. False means it can.

/* populates titlesCollection and idCollection
*/
function displayQuestionList (records) {
	titlesCollection = []; // re-initialize to empty so collection doesn't keep adding on each re-load.
	idCollection = [];
	var questionNum = 1;

	for (record in records){
		if(record != "surveyTitle" && record != "id" && record != "_id"){
			var surveyID = records[record]["id"];
			var title = records[record]["surveyTitle"];
			idCollection.push(surveyID);
			titlesCollection.push(title);
			questionNum += 1;
		};
	};
};

/* when the load button is clicked, first function checkes to see if loadCheck is false. If it is
 * then the page is made empty and the current questions are removed and repopulated with the surveyID
 * titles and ids of the records stored in survey templates. sidebar is populated with just a generic title.
*/
$( "#load" ).click(function() {
	if (loadCheck === false){
		questionCheck = true;
		$('#build_title').empty();
		$('.question').remove();
		$('.sidebarQuestion').remove();
		$('#sidebar p').html("Survey Title")
		var A;
		$.get(("http://localhost:5000/api/read/survey_templates"), function (data, status) {
			A = data;
			A = JSON && JSON.parse(A) || $.parseJSON(A);
			var mainPage = "";
			mainPage = displayQuestionList(A); // populates id and title collection
		
			if (titlesCollection.length > 0) {
				// rebuilds title display
				$("#build_title").html("<p>Select Survey to Load</p><ul id='load_menu'></ul>");
				
				// loops through title collection and rebuilds build_title section on page with names of surveys.
				// adds a tags to each to use for selection purposes.
				for (var i = 0; i < titlesCollection.length; i++) {
					$("#build_title").append("<li><a href='#' id='" +idCollection[i]+ "'>" +idCollection[i]+ ": " +titlesCollection[i]+ '</a><button class = "deleteSurvey" id="deleteSurvey-'+idCollection[i]+'">Delete</button></li>')
				};
			};
		});
	};
	loadCheck = true; // sets load check to true so the loading will not occur again.
});

/* action when a survey is clicked on the load screen. Gets target of "a" tag clicked, makes call to
 * survey templates, and retrieves record that matches id. The survey is then loaded on page.
*/
$("#build_parent").on("click", "a", function() {
		questionCheck = false; //allows new questions to be added
		var getID = event.target.id; // gets id of a tag clicked
		loadCheck = false; // allows the load screen to appear again if necessary.
	var A
	$.get(("http://localhost:5000/api/read/survey_templates"), function (data, status) {
		for (var i = 0; i< idCollection.length; i++){
			if (idCollection[i] == getID){
				var idHit = i + 1 // idHit refers to the index item to use for the matching ID found.
			}}

		A = data;
		A = JSON && JSON.parse(A) || $.parseJSON(A);
		console.log(A)
		console.log(idHit)
		loadAdminSurvey(A,idHit) // need to reference data with idHit within function because of Ajax call.
		});
});

/* when deleteSurvey is clicked on load screen, the id is generated and se
*/
$('#build_title').on("click", ".deleteSurvey", function(event){
	record = {} // initialize empty object to pass into delete Ajax call.
	var getButtonID = event.target.id;
	var getID = getButtonID.substr(getButtonID.indexOf("-") + 1); // parses out ID from getButtonID
	getID = getID.toString() // converts id to string to store into record object
	record["id"] = getID
	console.log(record)
	deleteSurveyTemplate(record,"survey_templates") // makes ajax call to delete record from collection
	// next 4 calls clear screen for re-display of survey templates.
	$('#build_title').empty();
	$('.question').remove();
	$('.sidebarQuestion').remove();
	$('#sidebar p').html("Survey Title");
	
	// re-display screen so it shows the updated collection.
	var A;
	$.get(("http://localhost:5000/api/read/survey_templates"), function (data, status) {
		A = data;
		A = JSON && JSON.parse(A) || $.parseJSON(A);
		var mainPage = "";
		mainPage = displayQuestionList(A); // populate collection arrays.
		if(titlesCollection.length > 0) {
			$("#build_title").html("<p>Select Survey to Load</p><ul id='load_menu'></ul>");
			for(var i = 0; i < titlesCollection.length; i++) {
				$("#build_title").append("<li><a href='#' id='" +idCollection[i]+ "'>" +idCollection[i]+ ": " +titlesCollection[i]+ '</a><button class = "deleteSurvey" id="deleteSurvey-'+idCollection[i]+'">Delete</button></li>')
			}
		};
	});
});

// ajax post to delete survey template from collection.
function deleteSurveyTemplate(record, collection) {
	$.get("http://localhost:5000/api/delete/"+collection + "/" + record)
     $.ajax({
                url: 'http://localhost:5000/api/delete/' + collection + "/"+record["id"],
                type: 'POST',
                data: JSON.stringify(record),
                contentType: "application/json",
                crossDomain: true,
                headers: {'Content-Type':'application/json; charset=utf-8'},
                dataType: 'json',

                success: function(response) {
                    console.log("Passed")
                    console.log(response);
                },
                error: function(error) {
                    console.log("Failed")
                    console.log(error);
                }
            });
}

$( "#loadComplete" ).click(function() {
		loadCheck = false;
		questionCheck = true;
		$('#build_title').empty();
		$('.question').remove();
		$('.sidebarQuestion').remove();
		$('#sidebar p').html("Survey Title")
		var A;
		$.get(("http://localhost:5000/api/read/completed_surveys"), function (data, status) {
			A = data;
			A = JSON && JSON.parse(A) || $.parseJSON(A);
			var mainPage = "";
			mainPage = displayQuestionList(A); // populates id and title collection
		
			if (titlesCollection.length > 0) {
				// rebuilds title display
				$("#build_title").html("<p>Select Completed Survey to Load</p><ul id='load_menu'></ul>");
				
				// loops through title collection and rebuilds build_title section on page with names of surveys.
				// adds a tags to each to use for selection purposes.
				for (var i = 0; i < titlesCollection.length; i++) {
					$("#build_title").append("<li><a href='#' id='" +idCollection[i]+ "'>" +idCollection[i]+'</a><button class = "deleteCompletedSurvey" id="deleteCompletedSurvey-'+idCollection[i]+'">Delete</button></li>')
				};
			};
		});
});


function pushCompletedSurvey(record, collection) {
     $.ajax({
                url: 'http://localhost:5000/api/create/' + collection,
                type: 'POST',
                data: JSON.stringify(record),
                contentType: "application/json",
                crossDomain: true,
                headers: {'Content-Type':'application/json; charset=utf-8'},
                dataType: 'json',

                success: function(response) {
                    console.log("Passed")
                    console.log(response);
                },
                error: function(error) {
                    console.log("Failed")
                    console.log(error);
                }
            });
}

$('#build_title').on("click", ".deleteCompletedSurvey", function(event){
	record = {} // initialize empty object to pass into delete Ajax call.
	var getButtonID = event.target.id;
	var getID = getButtonID.substr(getButtonID.indexOf("-") + 1); // parses out ID from getButtonID
	getID = getID.toString() // converts id to string to store into record object
	record["id"] = getID
	console.log(record)
	deleteCompletedSurvey(record,"completed_surveys") // makes ajax call to delete record from collection
	// next 4 calls clear screen for re-display of survey templates.
	$('#build_title').empty();
	$('.question').remove();
	$('.sidebarQuestion').remove();
	$('#sidebar p').html("Survey Title");
	
	// re-display screen so it shows the updated collection.
	var A;
	$.get(("http://localhost:5000/api/read/completed_surveys"), function (data, status) {
		A = data;
		A = JSON && JSON.parse(A) || $.parseJSON(A);
		var mainPage = "";
		mainPage = displayQuestionList(A); // populate collection arrays.
		if(titlesCollection.length > 0) {
			$("#build_title").html("<p>Select Survey to Load</p><ul id='load_menu'></ul>");
			for(var i = 0; i < titlesCollection.length; i++) {
				$("#build_title").append("<li><a href='#' id='" +idCollection[i]+ "'>" +idCollection[i]+'</a><button class = "deleteSurvey" id="deleteSurvey-'+idCollection[i]+'">Delete</button></li>')
			}
		};
	});
});

function deleteCompletedSurvey(record, collection) {
	$.get("http://localhost:5000/api/delete/"+collection + "/" + record)
     $.ajax({
                url: 'http://localhost:5000/api/delete/' + collection + "/"+record["id"],
                type: 'POST',
                data: JSON.stringify(record),
                contentType: "application/json",
                crossDomain: true,
                headers: {'Content-Type':'application/json; charset=utf-8'},
                dataType: 'json',

                success: function(response) {
                    console.log("Passed")
                    console.log(response);
                },
                error: function(error) {
                    console.log("Failed")
                    console.log(error);
                }
            });
}

