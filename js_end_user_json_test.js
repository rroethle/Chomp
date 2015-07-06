/* loops through survey record and displays each question in html to user
*/
function displayQuestionList (records) {
	//initializes blank variables and starts on question number 1.
	var entries = "";
	var questionNum = 1;
	
	/* as long as the record header isn't surveryTitle or id, then it attempts to build the HTML for reach type.
	   runs appropriate function to generate html based on answer.type for each record or question.
	*/

	console.log(records);
	for (record in records){
		// console.log(typeof record);
		console.log(record);




		if(record != "surveyTitle" && record != "id" && record != "_id"){

			//Debug
			var tempRec = records[record];
			// console.log(typeof tempRec);
			console.log(tempRec);

			var tempAns = tempRec["answer"];
			// console.log(typeof tempAns);
			console.log(tempAns);

			var tempType = tempAns["type"];
			// console.log(typeof tempType);
			console.log(tempType);


			switch(tempType) {
				case "text":
					entries +=  textHTML(questionNum,tempRec["text"]);
					break;
				case "radio":
					entries += radioHTML(questionNum,tempRec["text"],tempAns["name"],tempAns["options"]);
					break;
				case "textarea":
					var tempText = tempRec["text"];
					var tempRows = tempText["rows"];
					var tempCols = tempText["cols"];
					entries += textAreaHTML(questionNum,tempRec["text"], tempRows, tempCols);
					break;
				case "checkbox":
					
					entries +=  checkboxHTML(questionNum,tempRec["text"],tempAns["name"],tempAns["options"]);
					break;
				case "slider":
					entries += sliderHTML(questionNum,tempRec["text"], tempAns["name"],tempAns["lowerLimit"], tempAns["upperLimit"]);
				default:
					console.log("displayQuestionList: do not recognize type " + tempType)
					break;
				}	
		questionNum += 1;
		};
	};
	return entries;
};


// functions for each input type.

// inputs: question Number and questionText to generate html.
function textHTML(questionNum,questionText){
	html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>" +
	'<input type="text" id="'+ questionNum  +'Answer" placeholder="Enter Here" ></p>';
	return html;
}

//inputs: question Number, questionText, name of group for radio buttons, and options array for the values.
function radioHTML(questionNum, questionText, name, options){
	html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>";
	for (option in options){
	optionLine = '<input type="radio" id="' +questionNum+ 'Answer" name="' +questionNum+ 'radio" value="'+options[option] + '">' + options[option] + '<br>'
	html += optionLine
	}
	return html;
}

//inputs: question Number, questionText, name of group for check boxes, and options array for the values.
function checkboxHTML(questionNum, questionText, name, options){
	html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>"
	for (option in options){
	optionLine = '<input type="checkbox" id="' +questionNum+ 'Answer" name="' + questionNum + 'checkbox" value="'+options[option] + '">' + options[option] + '<br>'
	html += optionLine
	}
	return html;
}

//inputs: question Number, questionText, number of rows (height) of text box, and number of cols(width) of text box
function textAreaHTML(questionNum,questionText,rows,cols){
	html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>" +
	'<textarea id = "' + questionNum + 'Answer" "rows="' + rows + 'cols= ' + cols + '"></textarea>';
	return html;
}

//inputs: question Number, question Text, name of slider, lower limit for range, and upper limit for range.
function sliderHTML(questionNum,questionText,name,lowerlimit,upperlimit){
	html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>" +
	'<input id="' + questionNum + 'Answer" type="range" name = "'+ name + '" min='+ lowerlimit + '" max="'+ upperlimit + '" value = "'+lowerlimit+'">';
	return html;
}

// end of function types for input



/* loads json file from database filled with survey entries and displays the record in html.
*/


//$("#load").click(function() {
$(document).ready(function() {
	console.log("Page Loaded")
	var a = window.location.toString();
	a = a.substring(a.indexOf('survey=')+7);
	console.log("Survey ID is: " + a);

	var A;
	$.get(("http://localhost:5000/api/read/survey_templates/" + a), function (data, status) {
		A = data;
		console.log("A is " + A);
		A = JSON && JSON.parse(A) || $.parseJSON(A);


		var mainPage = "";
		mainPage = displayQuestionList(A);

		document.getElementById("user_area").innerHTML = mainPage; //Needs to change based on location for final website
		test = generateJSON()
	});	
});


//GET INPUT VALUES
$(document.body).on("change", "#Answer", function () {
	var a = $("#Answer").val();
	console.log(a);
});

function generateJSON(){
	var surveyAnswers = {}; // initialize empty object.
	var counter = 1;
	
    $('#user_area').find('#Answer').each(function() {
		var answerCounter = "Q"+counter;
		var answerValue = $('#' + answerCounter + '\\Answer').val(); 
		surveyAnswers[answerCounter] = {
							"answer": answerValue,
							"number": counter
						};
		counter += 1;
});// end of question loop.
console.log(surveyAnswers)
return surveyAnswers
// Ajax call to send json object to collection. Uses object and collection name for inputs.
//pushSurveyTemplate(surveys, "survey_templates");
}