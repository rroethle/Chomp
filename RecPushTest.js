// Pre-build Databases

complete = {
    "Complete1": {
        "id" : "111",
        "template_id": "1",
        "answers" : {},
        },
    "Complete2": {
        "id" : "112",
        "template_id": "1",
        "answers" : {},
        },
    "Complete3": {
        "id" : "113",
        "template_id": "1",
        "answers" : {},
        },
    "Complete4": {
        "id" : "211",
        "template_id": "2",
        "answers" : {},
        },
    "Complete5": {
        "id" : "212",
        "template_id": "2",
        "answers" : {},
        },
    "Complete6": {
        "id" : "213",
        "template_id": "2",
        "answers" : {},
        },
    },





$(function () {
        $("#test").on("click", function (e) {
            console.log("Triggered");

            pushSurveyTemplate(surveys.Survey1, "survey_templates");
            pushSurveyTemplate(surveys.Survey2, "survey_templates");

            pushSurveyTemplate(complete.Complete1, "completed_surveys");
            pushSurveyTemplate(complete.Complete2, "completed_surveys");
            pushSurveyTemplate(complete.Complete3, "completed_surveys");
            pushSurveyTemplate(complete.Complete4, "completed_surveys");
            pushSurveyTemplate(complete.Complete5, "completed_surveys");
            pushSurveyTemplate(complete.Complete6, "completed_surveys");

            


            console.log("End of Triggered");
        });
    });


function pushSurveyTemplate(record, collection) {
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





// jQuery equivalent
//var jqxhr = $.post( "localhost:5000/api/create_or_update_unit/",
//{"test" : "Fuck right off"},
//function() {console.log( "success" );}, 
// "json")
//   .done(function() {
//     console.log( "second success" );
//   })
//   .fail(function() {
//     console.log( "error" );
//   })
//   .always(function() {
//     console.log( "finished" );
// });


// $.ajax({
//  url: "localhost:5000/api/create_or_update_unit",
//     type: 'post',
//     datatype: "JSON",
//     data: {test : "Fucking work damnit"},
//     async: true,
//     success: function (response) {
//      console.log("Success?!?")
//         console.log(response);
//     }
// }).done(function (data) {
//  console.log("Success 2?")
//     console.log(data);
// });


// $.ajax({
//     url: 'http://10.2.20.31:5000/api/units/create',
//     type: 'POST',
//     data: {Test: "Test"},
//     contentType: "application/json",
//     crossDomain: true,
    
//     success: function(response) {
//      console.log("Passed")
//         console.log(response);
//     },
//     error: function(error) {
//      console.log("Failed")
//         console.log(error);
//     }
// });