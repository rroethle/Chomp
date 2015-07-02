var titlesCollection = [];
var idCollection = [];

function displayQuestionList (records) {
	var entries = "";
	var questionNum = 1;

	for (record in records){
		if(record != "surveyTitle" && record != "id" && record != "_id" && record != "build" && record != "sidebar"){
			var surveyID = records[record]["id"];
			//console.log(surveyID);
			var title = records[record]["surveyTitle"];
			//console.log(title);

			idCollection.push(surveyID);
			//console.log(idCollection);
			titlesCollection.push(title);
			//console.log(titlesCollection);
		questionNum += 1;
		};
	};
	return entries;
};


$("#load").click(function() {
	var A;
	$.get(("http://localhost:5000/api/read/units"), function (data, status) {
		A = data;
		console.log("A is " + A);
		A = JSON && JSON.parse(A) || $.parseJSON(A);
		console.log(A)

		var mainPage = "";
		mainPage = displayQuestionList(A);

		console.log(titlesCollection);
		if(titlesCollection.length > 0) {
			$("#build_title").html("<p>Select Survey to Load</p><ul id='load_menu'></ul>");
			for(var i = 0; i < titlesCollection.length; i++) {
				$("#build_title").append("<li><a href='#' id='" +idCollection[i]+ "'>" +idCollection[i]+ ": " +titlesCollection[i]+ "</a></li>");
			}
		}
	});
});

$(document).ready(function() {
	$("body").on("click", "li", function() {
		alert(event.target.id);
	});
});

//var id = (event.target.id);
//console.log(id);

//$("#build_title").click(function() {

//var x = (event.target.id);
//console.log(x);