$(document).ready(function() {
    $('#loginButton').click(function() {
        const username: string = $('#username').val() as string;  // Assure TypeScript that `.val()` will return a string
        const password: string = $('#password').val() as string;  // Same here
        const loginDetails: { username: string; password: string } = { username, password };

        $.ajax({
            type: 'POST',
            url: '/login',
            contentType: 'application/json',
            data: JSON.stringify(loginDetails),
            success: function(response: any) {  // 'response' type depends on what the server sends back
                // Handle successful login
                console.log('Login Successful:', response);
            },
            error: function(xhr: JQuery.jqXHR, status: string, error: string) {
                // Handle errors
                console.error('Login Failed:', error);
            }
        });
    });
});
