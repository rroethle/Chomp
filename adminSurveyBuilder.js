$(init)

/* initialize values on page. Populates first question. includes event handlers
  for handling buttons on click.
*/
function init() {
	var mainPage = "";
	var initialQuestion = "Q1";
	
	//uses dummy json file for testing
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
		// adds Qid.answer.options.choices.i for each choice as id
		for (var i = 0; i< numCheck; i++){
			$('#'+choiceID).append('<input type = "text" id = "'+Qid + '.answer.options.choices.' + i + '"><br>');
		}
	});
	
	//this was for testing purposes and will be moved to index files javascript to add new question.
	$('body').on('click','#newQuestion',function(){
		var id = $('div').last().attr('id');
		var Qid = id.substr(0, id.indexOf('.'));
		var newQid = Number(Qid.slice(1)) + 1;
		var qQid = "Q"+newQid;
		var html = "<hr><br>";//
		html += displayQuestion(newQid);
		$('#results').append(html);
	})
	
	
	 
        
};

/* generates response types available for user in a select input box. 
   Currently the following are available:
   -text
   -textarea
   -check boxes
   -radio buttons
   -slider
*/
function generateResponseType(QText){
	var responseQuestion = '<label for="'+ QText + '.answer.type' + '">Choose Question Response Type </label>'+
                '<select id="'+ QText + '.answer.type" >' + '<option>Text</option>' +
				'<option>Multi-Line Text</option>' + '<option>Check Box</option>' +
				'<option>Radio Button</option>' + '<option>Slider</option>' + '</select>'
	return responseQuestion;
}

// generates html for new text input box.
// adds .answer.text to question number for id.
function generateTextBox(QText) {
	var id = QText + '.answer.text';
	var html = '<div id="' + QText + '.answer.text"><TEXTAREA rows="2" cols="80"></TEXTAREA><br></div>';
	return html;
}

// generates html responses to ask user for new textarea box.
// adds .answer.text to question number for id.
function generateTextArea(QText) {
	var id = QText + '.answer.text';
	var html = '<div id="' + QText + '.answer.text"><TEXTAREA rows="8" cols="80"></TEXTAREA><br></div>';
	return html;
}

// generates responses for new slider item
// adds .answer.options to div id tag
// adds .QText.answer.options.min & .QText.answer.options.max to max and min values for input box
function generateSlider(QText){
	var id = QText + '.answer.options';
	var html = '<div id = "' + id + '"><label for="min">Min Value for Slider</label>'+
	'<input type = "number" name = "min" id = "' + QText + '.answer.options.min" value = "0" min = "0" max = "1000000" step = "1"><br>'+
	'<label for="max">Max Value for Slider</label>'+
	'<input type = "number" name = "max" id = "' + QText + '.answer.options.max" value = "0" min = "0" max = "1000000" step = "1"><br></div>'
	return html;
}

// adds responses asking user for number of inputs needed and a name for the grouping of the inputs.
// adds .answer.options to div id tag
// adds .QText.inputValue to number of inputs needed
// adds .QText.nameValue to name of grouping
function generateInputChoices(QText){
	var id = QText + '.answer.options';
	var html = '<div id = "' + id + '"><label for="'+QText + '.inputValue">Number of Inputs</label>'+
	'<input type = "number" id = "'+QText + '.inputValue" value = "2" min = "2" max = "10" step = "1"><br>'+
	'<label for="' + QText + '.nameValue">Name of Group</label>'+
	'<input type = "text" name = "'+ QText + '.nameValue" id = "' + QText + '.nameValue"><br>' +
	'<button id = "inputBoxButton" type = "button">Generate Inputs</button><br></div>'
	return html;
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
	var entry = "<div id=" + Qid + "><p><hr><br>" + "Question " + questionNum + '<button id="deleteQuestion"'
	+ ' type = "button">Delete Question</button>'+"<br>" + 
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
		  html += '<div id = "'+Qid + '.answer.options.choices" ></div>';
		  $('#' + checkID).append(html);
	  }
		})
);



// initial debugging function calls
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


