/* loads json file from database filled with survey entries and displays the record in html.
*/

$(document).ready(function()
{
var mainPage = "";
// uses test database to load and display records.
mainPage = displayQuestion(surveys.Survey1);

document.getElementById("build").innerHTML = mainPage; //Needs to change based on location for final website
});

/* loops through survey record and displays each question in html to user
*/
function displayQuestion (records) {
	//initializes blank variables and starts on question number 1.
	var entries = "";
	var questionNum = 1;
	
	/* as long as the record header isn't surveryTitle or id, then it attempts to build the HTML for reach type.
	   runs appropriate function to generate html based on answer.type for each record or question.
	*/
	for (record in records){
		if(record != "surveyTitle" || record != "id"){
			
			switch(records[record].answer.type) {
				case "text":
					entries +=  textHTML(questionNum,records[record].text);
					break;
				case "radio":
					entries += radioHTML(questionNum,records[record].text,records[record].answer.name,records[record].answer.options);
					break;
				case "textarea":
					entries += textAreaHTML(questionNum,records[record].text, records[record].text.rows, records[record].text.cols);
					break;
				case "checkbox":
					entries +=  checkboxHTML(questionNum,records[record].text,records[record].answer.name,records[record].answer.options);
					break;
				case "slider":
					entries += sliderHTML(questionNum,records[record].text, records[record].answer.name,records[record].answer.lowerLimit, records[record].answer.upperLimit);
				default:
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
	'<input type="text" id="Answer"'+ questionNum  +'placeholder="Enter Here" ></p>';
	return html;
}

//inputs: question Number, questionText, name of group for radio buttons, and options array for the values.
function radioHTML(questionNum, questionText, name, options){
	html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>";
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