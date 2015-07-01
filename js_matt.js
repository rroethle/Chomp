$("#add").on("click", function() {
	var id = $('div').last().attr('id')
	var Qid = id.substr(0, id.indexOf('.'));
	var newQid = Number(Qid.slice(1)) + 1
	var qQid = "Q"+newQid
	var html = "<hr><br>"
	html += displayQuestion(newQid)
	$("#build").append(html);
	$("#sidebar").append(html);
});