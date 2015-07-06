/* main logic for building survey template dynamically based on user interaction.
 * generates json file to store in collection
 * handles save of templates and checks to make sure they are not duplicates in collection.
*/

$(init)

/* initialize values on page. Populates first question. includes event handlers
  for handling buttons on click.
*/
function init() {
	var mainPage = "";
	var initialQuestion = "Q1";
	
	//creates first question to display
	mainPage += displayQuestion(1);
	
	//places initial question to screen
	$("#build ul").append(mainPage);
	
	//on any inputBoxButton click, finds closest div and display's the number of inputs generated.
	$('body').on('click','#inputBoxButton',function(){
		var id = $(this).closest('div').attr('id');
		var Qid = id.substr(0, id.indexOf('.')); //i.e. this will generate "Q1" or "Q10" from whatever div it finds
		var valueID = Qid + '\\.inputValue'; //adds escape characters and label(.inputValue) to our custom ID.
		var numCheck = $('#'+valueID).val(); //gets value from input box that determines how many inputs to generate

		var choiceID = Qid + '\\.answer\\.options\\.choices'; //adds div ID to input choice section
		$('#'+choiceID).empty() // removes any remaining "choice div sections currently on page"
		//loops through numCheck number of times to generate the correct number of input boxes.
		// adds Qid.answer.options.inputs for each choice as id
		for (var i = 0; i< numCheck; i++){
			$('#'+choiceID).append('<input type = "text" id = "'+Qid + '.answer.options.input.' + i + '"><br>');
		}
	});

	/* on save click, checks to make sure saveCheck is true, if it isn't then save is rejected.
	 * if a title is original, then loops through templates and determines the max ID in collection and adds one.
	 * to the newly assigned id. Record is then saved using the survey title name.
	*/
	$('body').on('click','#save',function(){
		var saveCheck = true;
		currentSurveyTitle = $('#survey_title').text(); // stores current survey title to use for checking against records.
		
		// checks to see if survey title has been added or is still at the default value. If it is, then a save is not initiated.
		if (currentSurveyTitle === "Click to Add Survey Title"){
			alert("No title has been entered, please enter title to save survey");
			saveCheck = false;
		};
		if (currentSurveyTitle === ""){
			saveCheck = false;
		}
		var A;
		if (saveCheck == true){
			$.get(("http://localhost:5000/api/read/survey_templates"), function (data, status) {
			A = data;
			currentSurveyTitle = $('#survey_title').text();
			var existCheck = false; // if value is true, then a title already exists with the same name.
			A = JSON && JSON.parse(A) || $.parseJSON(A);
			var ALength = A.length; // gets number of records in collection
			var maxValue = 0;
			// iterates through each record and compares titles. If match is found, loop exits.
			for (var i = 0; i< ALength; i++){
				var id = A[i]["id"];
				var checkTitle = A[i]["surveyTitle"];
				id = Number(id);
				if (checkTitle == currentSurveyTitle){
					maxValue = id;
					existCheck = true;
					break;
				}
				else if (id > maxValue){
					maxValue = id;
				};
			};
			if (existCheck === true){
				finalID = maxValue;
			}
			else{
				finalID = maxValue + 1;
			}
			finalID = finalID.toString();
			generateJSON(finalID);
		});
	};
}); // end of save click event function
}; //end of init function


/* generates response types available for user in a select input box. 
   Currently the following are available:
   -text
   -textarea
   -check boxes
   -radio buttons
   -slider
*/
function generateResponseType(QText){
	var responseQuestion = 'Choose Question Response Type'+
                '<select name = "customQuestions" id="'+ QText + '.answer.type" >' + '<option>Text</option>' +
				'<option>Multi-Line Text</option>' + '<option>Check Box</option>' +
				'<option>Radio Button</option>' + '<option>Slider</option>' + 
				'<option>Calendar</option>' + '</select>'
	return responseQuestion;
}

// generates html for new text input box.
// adds .answer.text to question number for id.
function generateTextBox(QText) {
	var id = QText + '.answer.text';
	var html = '<div id="' + QText + '.answer.text"><TEXTAREA rows="2" cols="80" disabled></TEXTAREA><br></div>';
	return html;
}

function generateCalendar(QText) {
	var id = QText + '.answer.text';
	var html = '<div id="' + QText + '.answer.text"><p>Date: <input type="text" id="datepicker"></p><br></div>'
	return html;
}


// generates html responses to ask user for new textarea box.
// adds .answer.text to question number for id.
function generateTextArea(QText) {
	var id = QText + '.answer.text';
	var html = '<div id="' + QText + '.answer.text"><TEXTAREA rows="8" cols="80" disabled></TEXTAREA><br></div>';
	return html;
}

// generates responses for new slider item
// adds .answer.options to div id tag
// adds .QText.answer.options.min & .QText.answer.options.max to max and min values for input box
function generateSlider(QText){
	var id = QText + '.answer.options';
	var html = '<div id = "' + id + '"><label for="min">Min Value for Slider</label>'+
	'<input type = "number" name = "min" id = "' + QText + '.answer.min" value = "0" min = "0" max = "1000000" step = "1"><br>'+
	'<label for="max">Max Value for Slider</label>'+
	'<input type = "number" name = "max" id = "' + QText + '.answer.max" value = "0" min = "0" max = "1000000" step = "1"><br></div>'
	return html;
}

// adds responses asking user for number of inputs needed and a name for the grouping of the inputs.
// adds .answer.options to div id tag
// adds .QText.inputValue to number of inputs needed
// adds .QText.nameValue to name of grouping
function generateInputChoices(QText){
	var id = QText + '.answer.options';
	var html = '<div id = "' + id + '">Number of Inputs' +
	'<input type = "number" id = "'+QText + '.inputValue" value = "2" min = "2" max = "10" step = "1"><br>'+
	'<button id = "inputBoxButton" type = "button">Generate Inputs</button><br></div>'
	return html;
}

function generateDefaultQuestions(QText) {
	var id = QText + 'defaultQuestion';
	var html = '<select name = "defaultQuestions" id = "'+ id + + '"><option>Name</option><option>Gender</option>'+
	'<option>Location</option><option>Age</option></select>'
	return html
}


//main function used to generate new Question
function displayQuestion (questionNum) {
	//HTML Portion
	var Qid = "Q" + questionNum;
	var QText = Qid + "Text";
	var AText = Qid + "Answer";
	var Bid = Qid + "deleteButton";
	var subDivID = Qid + "SubDiv";
	var responseType = generateResponseType(Qid);
	var textResponse = generateTextBox(Qid);
	var responseId = Qid + ".answer.type";
	var defaultQuestions = generateDefaultQuestions(Qid)
	var entry = "<div class = 'question' id=" + Qid + "><p><hr><br>" + "Question " + questionNum + '<button id="deleteQuestion"'
	+ ' type = "button">Delete Question</button>'+ '<button id="addDefaultQuestion" type = "button">Add Default Question</button>' + '<br>' + 
	'<TEXTAREA id="' + QText + '"  rows=6 cols=80 placeholder="Default Text"></TEXTAREA><br>' +
	'<div id="' + subDivID +'">' + responseType + textResponse + '</div>'
	return entry;
};

//main logic to interact with user on select case change. empties previous contents and then based on 
// nested if/else if loop generates appropriate response.
$(document).ready($('body').on('change', 'select', function(){
	// gets id of whatever is currently changing from document and gets the div ID
	var html = ""
	var option = $( document.activeElement ).val();
	var divID = $(document.activeElement).attr('id');
	var Qid = divID.substr(0, divID.indexOf('.'));
	// next 3 lines add escape characters to the text box, options, and inputBox id's to clear any outstanding content
	// and then display the correct data.
	var newID = Qid + "\\.answer\\.text";
	var choiceID = Qid + "\\.answer\\.options\\.choices";
	var inputBoxID = Qid + "\\.answer\\.options";
	//empty text or text area box for new item
	$('#'+newID).empty();
	//empty checkbox choices and checkbox choices for new item
	$('#'+choiceID).empty();
	$('#'+inputBoxID).empty();
	
	
	// nested loop to determine display based on select choice.
	// for radio button,check box, and slider options, appends new div to SubDiv.
	// text and textarea is just replaced on change.
	if (option == "Text"){
		html = generateTextBox(Qid);
		$('#'+newID).html(html);
	  }
    else if(this.value == "Radio Button"){
		$('#'+choiceID).remove();
		var checkID = Qid + "SubDiv";
		html = generateInputChoices(Qid);
		html += '<div id = "'+Qid + '.answer.options.choices" ></div>';
		$('#' + checkID).append(html);
	  }
	  else if(this.value == "Multi-Line Text"){
		  html = generateTextArea(Qid);
		  $('#'+newID).html(html);
	  }
	  else if (this.value == "Check Box"){
		  //removes choice div because it keeps getting re-added as part of this method
		  $('#'+choiceID).remove();
		  checkID = Qid + "SubDiv";
		  html = generateInputChoices(Qid);
		  html += '<div id = "'+Qid + '.answer.options.choices" ></div>';
		  $('#' + checkID).append(html);
	  }
	  else if (this.value == "Slider"){
		  //removes choice div because it keeps getting re-added as part of this method
		  $('#'+choiceID).remove();
		  checkID = Qid + "SubDiv";
		  html = generateSlider(Qid);
		  html += '<div id = "'+Qid + '.answer.options.choices\\" ></div>';
		  $('#' + checkID).append(html);
	  }
	  else if (this.value == "Calendar"){
		  $('#'+choiceID).remove();
		  html = generateCalendar(Qid);
		  $('#'+newID).html(html);
	  }
		})
);

// On change character pressed, not used currently, but could be used for debuggin.
$(document).ready($('body').on('input propertychange paste', 'input', function()
		{
			//console.log($(this).attr('id'));
			//console.log($(this).closest('div').attr('id'));
			//console.log($(this).val());
			//generateJSON()

			
			
		})
	);

// On change character pressed
$(document).ready($('body').on('input propertychange paste', 'TEXTAREA', function()
		{
			//console.log($(this).attr('id'));
			//console.log($(this).closest('div').attr('id'));
			//console.log($(this).val());
			//generateJSON()
		})
	);

/* generates json object to store in collection.
 * takes an id number as a string for input.
*/
function generateJSON(id){
	var surveys = {}; // initialize empty object.
	var title = $('#survey_title').text();

	surveys["surveyTitle"] = title;
	surveys["id"] = id;
	var counter = 1;
	
    $('#build').find('.question').each(function() {
		var question = "Q"+counter;
		var optionsArray = []; // stores the value for any input values used for radio or checkbox inputs.
		var type = $('#' + question + '\\.answer\\.type').val(); // select option type used for each input box.
		var lowerLimit = $('#' + question + '\\.answer\\.min').val(); // slider min value
		var upperLimit = $('#' + question + '\\.answer\\.max').val(); // slider max value
		var questionText = $('#' + question + 'Text').val();
		var inputNum = $('#' + question + '\\.inputValue').val(); // not used but currently stores value for input's generated, optionsArray length is used instead.
		//populates optionsArray with input values for checkbox or radio box.
		for (var i = 0; i < inputNum; i++){
			optionsValue = $('#' + question + '\\.answer\\.options\\.input\\.' +i ).val();
			optionsArray.push(optionsValue);
		};
		// "number" was added to keep track of the order with the iterator that will loop through
		// in loadAdminSurvey
		surveys[question] = {
							"text": questionText,
							"image": "",
							"answer": {
								"type": type,
								"options": optionsArray,
								"lowerLimit": lowerLimit,
								"upperLimit": upperLimit,
								"number": counter
							}
						};
		counter += 1;
		console.log(counter)// increments counter by 1 to loop through each question.
});// end of question loop.
// Ajax call to send json object to collection. Uses object and collection name for inputs.
pushSurveyTemplate(surveys, "survey_templates");
}

// creates title html for build and sidebar section. Title text is used for input.
function generateTitle(title){
		$("#build_title").html("<button id='survey_title'>" +title+ "</button><div id='build_area'></div>");
		$("#sidebar").html('<p>' +title+ "</p>");
}

// creates new side bar entry. For Q1, anchor tag href is set to top, otherwise, href set to the id minus one to go to a more user friendly location.
function generateSideBar(question, Qid){
	if (Qid == "Q1"){
		var html = '<div class = "sidebarQuestion" id = "Q' + question + '-sidebar"><a href="#top">Question ' + question + '</a><div><br>';
	}
	else{
		var numId = Qid.slice(1)
		numId = numId -1
		Qid = "Q"+numId;
	var html = '<div class = "sidebarQuestion" id = "Q' + question + '-sidebar"><a href="#' +Qid+ '">Question ' + question + '</a><div><br>';
	}
	return html;
}

/* main function for re-building survey template based on complete json object of all survey templates(survey1)
 * and number of record interested in num. Accessed this way because of asynchronous Ajax call.
*/
function loadAdminSurvey(survey1,num){
	num = num - 1; //subtract 1 from record entered because of "0" indexing 
	var survey = survey1[num]; // individual survey object generated.
	
	// load screen cleared (next two items)
	$('#build_title li').remove();
	$('#sidebar p').empty();

	
	var surveyTitle = survey["surveyTitle"];
	generateTitle(surveyTitle);
	var questionNum = 1; // starting point to loop through questions found in record
	var surveyEmpty = false; // flag used to indicate when rebuilding is complete.
	
	/* due to record data coming in a different order than what was stored in the json file, the object
	 * must be looped through iteratively so it can be re-organized and displayed on screen. The question
	 * numbers are matched up.
	*/
	while (surveyEmpty == false){
		
		for (record in survey){
			
			var qNum = "Q"+questionNum;
			if (record != "surveyTitle" && record != "id" && record != "_id"){
				//generate variables used for accessing data in records.
				var tempRec = survey[record];
				console.log(tempRec)
				var tempAns = tempRec["answer"];
				var tempOpt = tempAns["options"];
				//the numbers match, then this is the next question needed to display and the data will be built.
				if (tempAns["number"] == questionNum){
					var question = displayQuestion(questionNum); //html for blank question
					var sidebarQuestion = generateSideBar(questionNum, qNum); //html for sidebar
					$("#build").append(question); //blank question appended to display
					$("#sidebar").append(sidebarQuestion); // sidebar question text appended to sidebar
					//variables used for creating new id's for elements.
					var choiceID = qNum + "\\.answer\\.options\\.choices";
					var numChoices = tempOpt.length;
					var checkID = qNum + "SubDiv";
					var tempType = tempAns["type"];
					var text = survey[record].text;
					$('#' + qNum + 'Text' ).val(text);
					var tempText = qNum + "\\.answer\\.text";
					$('#'+tempText).empty();
				//switch case used based on the answer type used in the select cases.
					switch(tempType) {
						case "Text":
							$('#' + qNum + '\\.answer\\.type' ).val("Text");
							var textHTML = generateTextBox(qNum);
							$('#'+tempText).html(textHTML);
							break;
					
						case "Multi-Line Text":
							$('#' + qNum + '\\.answer\\.type' ).val("Multi-Line Text");
							var textAreaHTML = generateTextArea(qNum);
							$('#'+tempText).html(textAreaHTML);
							break;
						
						case "Radio Button":
							$('#' + qNum + '\\.answer\\.type' ).val("Radio Button");
							$('#'+choiceID).remove();
							var radioHTML = generateInputChoices(qNum);
							radioHTML += '<div id = "'+qNum + '.answer.options.choices" ></div>';
							$('#' + checkID).append(radioHTML);
							for (var i = 0; i< numChoices; i++){
								$('#'+choiceID).append('<input type = "text" id = "'+qNum + '.answer.options.input.' + i + '"><br>');
								$('#'+qNum + '\\.answer\\.options\\.input\\.' + i).val(tempOpt[i]);
							};
							$('#'+qNum+'\\.inputValue').val(numChoices);
							break;
						
						case "Check Box":
							$('#' + qNum + '\\.answer\\.type' ).val("Check Box");
							$('#'+choiceID).remove();
							var checkHTML = generateInputChoices(qNum);
							checkHTML += '<div id = "'+qNum + '.answer.options.choices" ></div>';
							$('#' + checkID).append(checkHTML);
							for (var i = 0; i< numChoices; i++){
								$('#'+choiceID).append('<input type = "text" id = "'+qNum + '.answer.options.input.' + i + '"><br>');
								$('#'+qNum + '\\.answer\\.options\\.input\\.' + i).val(tempOpt[i]);
							}
							$('#'+qNum+'\\.inputValue').val(numChoices);
							break;
						
						case "Slider":
							$('#' + qNum + '\\.answer\\.type' ).val("Slider");
							var sliderHTML = generateSlider(qNum);
							$('#' + checkID).append(sliderHTML);
							var lowerLimit = tempAns["lowerLimit"];
							var upperLimit = tempAns["upperLimit"];
							$('#' + qNum + '\\.answer\\.min').val(lowerLimit);
							$('#' + qNum + '\\.answer\\.max').val(upperLimit);
							
						case "Calendar":
							$('#' + qNum + '\\.answer\\.type' ).val("Calendar");
						
					default:
						console.log("displayQuestionList: do not recognize type " + tempType)
						break;
					};//end of switch case
			delete survey[record]; //removes question from record
			questionNum += 1;
				}; //end of if check to see if numbers match
			}; // end of if check to make sure the record is using the title, id, or _id.
		}; // end of for loop
		checkNum = Object.keys(survey).length;
		if (checkNum <= 3){
		console.log(survey)
		surveyEmpty = true;
		};
		}
	}
	


// ajax call to send json record to appropriate collection.
function pushSurveyTemplate(record, collection) {
	console.log(record)
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