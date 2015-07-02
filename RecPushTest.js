
$(function () {
        $("#test").on("click", function (e) {
        	console.log("Triggered");

            pushSurveyTemplate(surveys.Survey1, "units");

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
// 	url: "localhost:5000/api/create_or_update_unit",
//     type: 'post',
//     datatype: "JSON",
//     data: {test : "Fucking work damnit"},
//     async: true,
//     success: function (response) {
//     	console.log("Success?!?")
//         console.log(response);
//     }
// }).done(function (data) {
// 	console.log("Success 2?")
//     console.log(data);
// });


// $.ajax({
//     url: 'http://10.2.20.31:5000/api/units/create',
//     type: 'POST',
//     data: {Test: "Test"},
//     contentType: "application/json",
//     crossDomain: true,
    
//     success: function(response) {
//     	console.log("Passed")
//         console.log(response);
//     },
//     error: function(error) {
//     	console.log("Failed")
//         console.log(error);
//     }
// });