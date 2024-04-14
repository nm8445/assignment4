"use strict";
$(document).ready(function () {
    $('#loginButton').click(function () {
        const username = $('#username').val();
        const password = $('#password').val();
        const loginDetails = { username, password };
        $.ajax({
            type: 'POST',
            url: '/login',
            contentType: 'application/json',
            data: JSON.stringify(loginDetails),
            success: function (response) {
                console.log('Login Successful:', response);
            },
            error: function (xhr, status, error) {
                console.error('Login Failed:', error);
            }
        });
    });
});
//# sourceMappingURL=loginclient.js.map