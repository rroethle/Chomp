surveys = {
	"Survey1" : {
		"surveyTitle" : "Couchy room",
		"Q1" : {
			"text" : "What should the name of the couch room be?",
			"image" : null,
			"answer" : {
				"type" : "text"
			}
		},

		"Q2" : {
			"text" : "What color should they be?",
			"image" : null,
			"answer" : {
				"type" : "radio",
				"name" : "colors",
				"options" : ["Black", "Brown", "Red", "Blue"]
			}
		},

		"Q3" : {
			"text" : "On a scale of 1 to 10, rate the comfyness?",
			"image" : null,
			"answer" : {
				"type" : "slider",
				"name" : "Comfyness",
				"lowerLimit" : 0,
				"upperLimit" : 10
			} // "slider",
		},
		"Q4" : {
			"text" : "Do you like the couch",
			"image" : null,
			"answer" : {
				"type" : "checkbox",
				"name" : "blah",
				"options" : ["blah", "Blah", "BLAH!!!!", "Test"]
			}
		}
		
	},



	"Survey2" : {
		"surveyTitle" : "Foo-Bar",
		"Q1" : {
			"text" : "Foo?",
			"image" : null,
			"answer" : {
				"type" : "textarea",
			}
		},

		"Q2" : {
			"text" : "Bar?",
			"image" : null,
			"answer" : {
				"type" : "hidden"
			}
		},

		"Q3" : {
			"text" : "Definitely Foo-Bar?",
			"image" : "http://http://kaplaninternational.com/blog/wp-content/uploads/2011/08/blah-290x300.jpg",
			"answer" : {
				"type" : "checkbox",
				"options" : ["blah", "Blah", "BLAH!!!!"] //"checkbox"
			}
		},
	

	}
}


function sidebarTitle() {
	$("#side_title").html("Ttile: " + surveys.Survey1.surveyTitle);
}

function displaySidebar(q, questionNumber) {
	$("#overview").html(questionNumber + ": " + q.text);
}

function pushRecord() {
	var input = "";
	surveys.Survey1["Q5"] = ({
		"text" : "Question 5?",
		"image" : null,
		"answer" : {
			"type" : "textarea",
			"rows": 4,
			"cols": 50
		}
	});
}






sidebarTitle()
pushRecord()
displaySidebar(surveys.Survey1.Q4, 4)






/*
function displayFakeQuestion (questionNum, record) {
	console.log(record);
	entry = "<p><hr><br>" + questionNum + ". " + record.text + "<br>" +
	'<input type="text" id="Answer"+questionNum  placeholder="Enter Here" ></p>';
	console.log(entry);
	return entry;
};
 $(document).ready(function() {
 	var mainPage = "";
 	mainPage += displayFakeQuestion(1, surveys.Survey1.Q1);
 	mainPage += displayFakeQuestion(2, surveys.Survey1.Q2);
 	mainPage += displayFakeQuestion(3, surveys.Survey1.Q3);
	document.getElementById("questions").innerHTML = mainPage;
});
*/