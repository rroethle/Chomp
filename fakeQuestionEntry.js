



function displayFakeQuestion (questionNum, record) {
	console.log(record);
	entry = "<p><hr><br>" + questionNum + ". " + record.text + "<br>" +
	'<input type="text" id="Answer"+questionNum  placeholder="Enter Here" ></p>';
	console.log(entry);
	return entry;
};




// $(document).ready(function()
// {
// 	var mainPage = "";
// 	mainPage += displayFakeQuestion(1, surveys.Survey1.Q1);
// 	mainPage += displayFakeQuestion(2, surveys.Survey1.Q2);
// 	mainPage += displayFakeQuestion(3, surveys.Survey1.Q3);

// 	document.getElementById("results").innerHTML = mainPage;
// });