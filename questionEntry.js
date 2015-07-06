/* receives json object and generates end user survey.
 * loops through each survey record and displays each question in html to user
*/

// function runs to allow datepicker work with jQueryUI if they select Calendar
 $(function() {
$('body').on('click','#datepicker',function(){
	 $( "#datepicker" ).datepicker();
})
  });

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
				case "calendar":
					entries += calendarHTML(questionNum, tempRec["text"]);
				
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
	var html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>" +
	'<input type="text" id="Answer"'+ questionNum  +'placeholder="Enter Here" ></p>';
	return html;
}

function calendarHTML(questionNum, questionText) {
	var html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>" +
	'<p>Choose Date: <input type="text" id="datepicker"></p>'
	return html
}

//inputs: question Number, questionText, name of group for radio buttons, and options array for the values.
function radioHTML(questionNum, questionText, name, options){
	var html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>";
	for (option in options){
	optionLine = '<input type="radio" name="' + name + ' value="'+options[option] + '">' + options[option] + '<br>'
	html += optionLine
	}
	return html;
}

//inputs: question Number, questionText, name of group for check boxes, and options array for the values.
function checkboxHTML(questionNum, questionText, name, options){
	html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>"
	for (option in options){
	optionLine = '<input type="checkbox" name="' + name + ' value="'+options[option] + '">' + options[option] + '<br>'
	html += optionLine
	}
	return html;
}

//inputs: question Number, questionText, number of rows (height) of text box, and number of cols(width) of text box
function textAreaHTML(questionNum,questionText,rows,cols){
	html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>" +
	'<textarea rows="' + rows + 'cols= ' + cols + '"></textarea>';
	return html;
}

//inputs: question Number, question Text, name of slider, lower limit for range, and upper limit for range.
function sliderHTML(questionNum,questionText,name,lowerlimit,upperlimit){
	html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>" +
	'<input type="range" name = "'+ name + '" min='+ lowerlimit + '" max="'+ upperlimit + '" value = "'+lowerlimit+'">';
	return html;
}

// end of function types for input



/* loads json file from database filled with survey entries and displays the record in html.
*/


$("#load").click(function() {
//$(document).ready(function() {
	console.log("Page Loaded")
	var a = window.location.toString();
	a = a.substring(a.indexOf('survey=')+7);
	console.log("Survey ID is: " + a);

	var A;
	$.get(("http://localhost:5000/api/read/units/" + a), function (data, status) {
		A = data;
		console.log("A is " + A);
		A = JSON && JSON.parse(A) || $.parseJSON(A);


		var mainPage = "";
		mainPage = displayQuestionList(A);
		document.getElementById("build_area").innerHTML = mainPage; //Needs to change based on location for final website
	});	
});