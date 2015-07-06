function login_call() {
    var user_name = $("#username").val();
    console.log(user_name);
    var pass_word = $("#password").val();
    console.log(pass_word);
    var record = {"username":user_name, "password":pass_word}
     $.ajax({
                url: 'http://localhost:5000/login',
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
