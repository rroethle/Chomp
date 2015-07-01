$(init)

/* initialize values on page. Populates first question. includes event handlers
  for handling buttons on click.
*/
function init() {
	var mainPage = "";
	initialQuestion = "Q1";
	//uses dummy json file for testing
	mainPage += displayQuestion(1);
	//places initial question to screen
	$("#build ul").append(mainPage)
	//document.getElementById("build ul").innerHTML = mainPage;
	
	//on any inputBoxButton click, finds div closest and display number of inputs generated.
	$('body').on('click','#inputBoxButton',function(){
		var id = $(this).closest('div').attr('id')
		var Qid = id.substr(0, id.indexOf('.'));
		var valueID = Qid + '\\.inputValue'
		numCheck = $('#'+valueID).val()

		var choiceID = Qid + '\\.answer\\.options\\.choices'
		console.log(choiceID)
		$('#'+choiceID).empty()
		for (var i = 0; i< numCheck; i++){
			$('#'+choiceID).append('<input type = "text" id = "'+Qid + '.answer.options.choices.' + i + '"><br>')
		}
	})
	
	$('body').on('click','#newQuestion',function(){
		
		var id = $('div').last().attr('id')
		var Qid = id.substr(0, id.indexOf('.'));
		var newQid = Number(Qid.slice(1)) + 1
		var qQid = "Q"+newQid
		var html = "<hr><br>"
		html += displayQuestion(newQid)
		console.log(html)
		$('#results').append(html)
	})
	 
        
};


function Question(category) {
	this.category = category,
	this.options = [],
	this.upperlimit = 0,
	this.lowerlimit = 0,
	this.name = "",
	this.image = ""
}

//removes select options from questionOption and then re-populates list after going through
//all the exercise objects and matching them to the appropriate category.
function getCategory(){
	$("#questionOption").empty();
	var typeOfQuestionOption = $('#questionType').val();
	for (question in questions){
		if (questions[question].category == typeOfQuestionOption){
			for (value in questions[question].options){
				$("#questionOption").append('<option>'+questions[question].options[value]+'</option>');
			}
		}
	}
	if (typeOfQuestionOption === "Check Box" || typeOfQuestionOption === "Radio Button"){
		$('#optionText').show()
	}
	else{
		$('#optionText').hide()
	}
}


questions = [
	textBox = new Question("Text"),
	textArea = new Question("Multi-Line Text"),
	radioBox = new Question("Radio Button"),
	checkBox = new Question("Check Box"),
	slider = new Question("Slider")
]

textBox.options = ["Text", "Number", "Hidden", "Password"];
radioBox.options = ["Add Item"];
checkBox.options = ["Add Item"];
textArea.options = ["Width", "Height"];
slider.options = ["Max Width", "Min Width"];

function generateResponseType(questionNum){
	responseQuestion = '<label for="'+ questionNum+ '.answer.type' + '">Choose Question Response Type </label>'+
                '<select id="'+ questionNum + '.answer.type" >' + '<option>Text</option>' +
				'<option>Multi-Line Text</option>' + '<option>Check Box</option>' +
				'<option>Radio Button</option>' + '<option>Slider</option>' + '</select>'
	return responseQuestion
}

function generateTextBox(QText) {
	id = QText + '.answer.text'
	console.log(id)
	html = '<div id="' + QText + '.answer.text"><TEXTAREA rows="2" cols="80"></TEXTAREA><br></div>'
	return html
}

function generateTextArea(QText) {
	id = QText + '.answer.text'
	
	html = '<div id="' + QText + '.answer.text"><TEXTAREA rows="8" cols="80"></TEXTAREA><br></div>'
	return html
}

function generateSlider(QText){
	var id = QText + '.answer.options'
	var html = '<div id = "' + id + '"><label for="min">Min Value for Slider</label>'+
	'<input type = "number" name = "min" id = "' + QText + '.answer.options.min" value = "0" min = "0" max = "1000000" step = "1"><br>'+
	'<label for="max">Max Value for Slider</label>'+
	'<input type = "number" name = "max" id = "' + QText + '.answer.options.max" value = "0" min = "0" max = "1000000" step = "1"><br></div>'
	return html
}

function generateInputChoices(QText){
	var id = QText + '.answer.options'
	var html = '<div id = "' + id + '"><label for="'+QText + '.inputValue">Number of Inputs</label>'+
	'<input type = "number" id = "'+QText + '.inputValue" value = "2" min = "2" max = "10" step = "1"><br>'+
	'<label for="' + QText + '.nameValue">Name of Group</label>'+
	'<input type = "text" name = "'+ QText + '.nameValue" id = "' + QText + '.nameValue"><br>' +
	'<button id = "inputBoxButton" type = "button">Generate Inputs</button><br></div>'
	return html
	
}

function generateRadioBoxChoices(QText){
	a = '<label for="check1">Name of Group</label>'+
	'<input type = "text" name = check1 id = "' + QText + '.answer.text.choice.1">' +
	'<input type = "text" name = check2 id = "' + QText + '.answer.text.choice.2">' + '</div>'
	
}


function displayQuestion (questionNum) {
	//HTML Portion
	var Qid = "Q" + questionNum;
	var QText = Qid + "Text";
	var AText = Qid + "Answer";
	var Bid = Qid + "Button";
	var subDivID = Qid + "SubDiv";
	var responseType = generateResponseType(Qid);
	var textResponse = generateTextBox(Qid);
	var responseId = Qid + ".answer.type";
	var entry = "<div id=" + Qid + "><p><hr><br>" + "Question " + questionNum + "<br>" +
	'<TEXTAREA id="' + QText + '"  rows=6 cols=80 placeholder="Default Text"></TEXTAREA><br>' +
	'<div id="' + subDivID +'">' + responseType + textResponse + '</div>'

	return entry;
};









function addTextLine(divID) {
	// Temporary Tag Holder
	AText = "Test";
	// Somehow we need to figure out what the last tag used was, and add to it.
	document.getElementById(divID).innerHTML += '<input type="text" id="' + AText + '"  placeholder="Enter Here" ><br>';
};

// On change character pressed
$(document).ready($('body').on('input propertychange paste', 'input', function()
		{
			console.log($(this).attr('id'));
			console.log($(this).closest('div').attr('id'));
			console.log($(this).val());
		})
	);

// On change character pressed
$(document).ready($('body').on('input propertychange paste', 'TEXTAREA', function()
		{
			console.log($(this).attr('id'));
			console.log($(this).closest('div').attr('id'));
			console.log($(this).val());
		})
	);


	
$(document).ready($('body').on('change', 'select', function()
		{
		option = $( document.activeElement ).val()
		divID = $(document.activeElement).attr('id')
		
		Qid = divID.substr(0, divID.indexOf('.'));
		newID = Qid + "\\.answer\\.text"
		choiceID = Qid + "\\.answer\\.options\\.choices"
		checkBoxID = Qid + "\\.answer\\.options"
		//empty text or text area box for new item
		$('#'+newID).empty()
		//empty checkbox choices and checkbox choices for new item
		$('#'+choiceID).empty()
		$('#'+checkBoxID).empty()
		
		
	  if (option == "Text"){
		  html = generateTextBox(Qid)
		  $('#'+newID).html(html)
	  }
      else if(this.value == "Radio Button"){
		   $('#'+choiceID).remove()
		  checkID = Qid + "SubDiv"
		  html = generateInputChoices(Qid)
		  html += '<div id = "'+Qid + '.answer.options.choices" ></div>'
		  $('#' + checkID).append(html)
	  }
	  else if(this.value == "Multi-Line Text"){
		  html = generateTextArea(Qid)
		  $('#'+newID).html(html)
	  }
	  else if (this.value == "Check Box"){
		  //removes choice div because it keeps getting re-added as part of this method
		  $('#'+choiceID).remove()
		  checkID = Qid + "SubDiv"
		  html = generateInputChoices(Qid)
		  html += '<div id = "'+Qid + '.answer.options.choices" ></div>'
		  $('#' + checkID).append(html)
	  }
	  else if (this.value == "Slider"){
		  //removes choice div because it keeps getting re-added as part of this method
		  $('#'+choiceID).remove()
		  checkID = Qid + "SubDiv"
		  html = generateSlider(Qid)
		  html += '<div id = "'+Qid + '.answer.options.choices" ></div>'
		  $('#' + checkID).append(html)
	  }
	  
		})
);


