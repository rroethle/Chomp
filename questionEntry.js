$(document).ready(function()
{
var mainPage = "";
mainPage = displayQuestion(surveys.Survey1);

document.getElementById("build").innerHTML = mainPage;
});

function displayQuestion (records) {
	var entries = "";
	questionNum = 1;
	
	for (record in records){
		if(record != "surveyTitle" || record != "id"){
			console.log(records[record].answer.type)
			switch(records[record].answer.type) {
				case "text":
					entries +=  textHTML(questionNum,records[record].text)
					break;
				case "radio":
					entries += radioHTML(questionNum,records[record].text,records[record].answer.name,records[record].answer.options)
					console.log(entries)
					break;
				case "textarea":
					entries += textAreaHTML(questionNum,records[record].text, records[record].text.rows, records[record].text.cols)
					break;
				case "checkbox":
					entries +=  checkboxHTML(questionNum,records[record].text,records[record].answer.name,records[record].answer.options)
					break;
				case "slider":
					entries += sliderHTML(questionNum,records[record].text, records[record].answer.name,records[record].answer.lowerLimit, records[record].answer.upperLimit)
				default:
					break;
				}	
		questionNum += 1;
		};
	};
	return entries;
};


function textHTML(questionNum,questionText){
	html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>" +
	'<input type="text" id="Answer"'+ questionNum  +'placeholder="Enter Here" ></p>';
	return html
}

function radioHTML(questionNum, questionText, name, options){
	html = html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>"
	for (option in options){
	optionLine = '<input type="radio" name="' + name + ' value="'+options[option] + '">' + options[option] + '<br>'
	html += optionLine
	}
	return html
}

function checkboxHTML(questionNum, questionText, name, options){
	html = html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>"
	for (option in options){
	optionLine = '<input type="checkbox" name="' + name + ' value="'+options[option] + '">' + options[option] + '<br>'
	html += optionLine
	}
	return html
}

function textAreaHTML(questionNum,questionText,rows,cols){
	html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>" +
	'<textarea rows="' + rows + 'cols= ' + cols + '"></textarea>'
	return html
}

function sliderHTML(questionNum,questionText,name,lowerlimit,upperlimit){
	html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>" +
	'<input type="range" name = "'+ name + '" min='+ lowerlimit + '" max="'+ upperlimit + '" value = "'+lowerlimit+'">'
	return html
}

