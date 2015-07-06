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
		//console.log(record);

		if(record == "surveyTitle") {
			var title = records[record];
			console.log(title);

			$("#user_title").html(title);
		}


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
	'<input type="text" class="answer" name="' +questionNum+ '" placeholder="Enter Here" ></p>';
	return html;
}

//inputs: question Number, questionText, name of group for radio buttons, and options array for the values.
function radioHTML(questionNum, questionText, name, options){
	html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>";
	for (option in options){
	optionLine = '<input type="radio" class="answer" id="' +questionNum+ 'radio" name="' +questionNum+ 'radio" value="'+options[option] + '">' + options[option] + '<br>'
	html += optionLine
	}
	return html;
}

//inputs: question Number, questionText, name of group for check boxes, and options array for the values.
function checkboxHTML(questionNum, questionText, name, options){
	html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>"
	for (option in options){
	optionLine = '<input type="checkbox" class="answer" id="' +questionNum+ 'checkbox" name="' +questionNum+ 'checkbox" value="'+options[option] + '">' + options[option] + '<br>'
	html += optionLine
	}
	return html;
}

//inputs: question Number, questionText, number of rows (height) of text box, and number of cols(width) of text box
function textAreaHTML(questionNum,questionText,rows,cols){
	html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>" +
	'<textarea class="answer" name="' +questionNum+ '" rows="' + rows + 'cols= ' + cols + '"></textarea>';
	return html;
}

//inputs: question Number, question Text, name of slider, lower limit for range, and upper limit for range.
function sliderHTML(questionNum,questionText,name,lowerlimit,upperlimit){
	html = "<p><hr><br>" + questionNum + ". " + questionText + "<br>" +
	'<input type="range" class="answer" id="slider" name = "' +questionNum+ '" min='+ lowerlimit + '" max="'+ upperlimit + '" value = "'+lowerlimit+'">';
	return html;
}

// end of function types for input



/* loads json file from database filled with survey entries and displays the record in html.
*/


//$("#load").click(function() {
$(document).ready(function() {
	console.log("Page Loaded")
	var args = window.location.toString();
	enduserID = args.substring(args.indexOf('survey=')+7);
	console.log("Enduser ID is: " + enduserID);

	var enduserData;
	$.get(("http://localhost:5000/api/read/completed_surveys/" + enduserID), function (enduser_data, status) {
		enduserData = enduser_data;
		console.log("Data is " + enduserData);
		var enduserJSON = JSON && JSON.parse(enduserData) || $.parseJSON(enduserData);

		var templateID = enduserJSON["template_id"];
		console.log("Template that was used is: " + templateID);

		$.get(("http://localhost:5000/api/read/survey_templates/" + templateID), function (template_data, status) {
			templateData = template_data;
			console.log(typeof templateData);
			console.log(templateData);
			var templateJSON = JSON && JSON.parse(templateData) || $.parseJSON(templateData);


			var mainPage = "";
			mainPage = displayQuestionList(templateJSON);
			document.getElementById("user_area").innerHTML = mainPage; //Needs to change based on location for final website
		});	
	});
});



//GET INPUT VALUES
survey = {};
$(document.body).on("change", ".answer", function () {
	var name = (event.target.name);
	var type = (event.target.type);
	if(type != "radio" && type != "checkbox") {
		var a = $("input[name=" +name+ "]").val();
		survey[name] = a;
		console.log(survey);
	} else if(type == "radio") {
		var a = $("input[name=" +name+ "]:checked").val();
		survey[name] = a;
		console.log(survey);
	} else if(type == "checkbox") {
		var a = $("input:checkbox:checked").map(function() {
			return this.value;
		}).get();
		survey[name] = a;
		console.log(survey);
	}
});

	$('body').on('click','#save',function(){
		pushCompletedSurvey(survey,"completed_surveys")
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




/*
$(document.body).on("change", "#slider", function () {
	var s = $("#slider").val();
	console.log(s);
});

$(document.body).on("change", function () {
	var r = $("input[name=3radio]:checked").val();
	console.log(r);
});

$(document.body).on("change", function () {
	var c = $("input:checkbox:checked").map(function() {
		return this.value;
	}).get();
	console.log(c);
});
*/