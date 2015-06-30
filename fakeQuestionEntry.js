



function displayFakeQuestion (questionNum, record) {
	console.log(record);

	//HTML Portion
	var Qid = "Q" + questionNum;
	var QText = Qid + "Text";
	var AText = Qid + "Answer";
	var Bid = Qid + "Button";
	var subDivID = Qid + "SubDiv";
	var entry = "<div id=" + Qid + "><p><hr><br>" + questionNum + ". <br>" +
	'<TEXTAREA id="' + QText + '"  rows=10 cols=80 placeholder="' + record.text + '"></TEXTAREA><br>' +
	'<div id="' + subDivID +'">' +
	'<input type="text" id="' + AText + '"  placeholder="Enter Here" ><br>' +
	'</div>' +
	'<button type="button" id="' + Bid + '">+</button><br>' +
	'</p></div>';

	//JS Portion
	// entry += '<script type="text/javascript">' +
	// 		 '$(document).ready(function()' +
	// 			'{$("' + QText + '").on("input propertychange paste", function()' +
	// 					'{console.log("Trigger");' +
	// 				'});' +
	// 			'});' +
	// 		'</script>'

	console.log(entry);
	return entry;
};





function addTextLine(divID) {
	
	// Temporary Tag Holder
	AText = "Test";
	// Somehow we need to figure out what the last tag used was, and add to it.

	document.getElementById(divID).innerHTML += '<input type="text" id="' + AText + '"  placeholder="Enter Here" ><br>';



};


$(document).ready(function()
{
	var mainPage = "";
	test = "Q1";
	mainPage += displayFakeQuestion(1, surveys.Survey1[test]);
	mainPage += displayFakeQuestion(2, surveys.Survey1.Q2);
	mainPage += displayFakeQuestion(3, surveys.Survey1.Q3);

	document.getElementById("results").innerHTML = mainPage;
});




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

// On change character pressed
$(document).ready($('body').on('click', 'button', function()
		{
			divID = $(this).closest('div').attr('id');
			objID = $(this).attr('id');
			console.log(objID);
			console.log(divID);
			addTextLine(divID+"SubDiv");
		})
	);