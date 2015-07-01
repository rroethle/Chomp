

$("#add").on("click", function() {
	$("#build ul").append("<li>Question 1</li>");
});

$("#build ul").change(function() {
	$("#sidebar ul").append("#build ul");
});