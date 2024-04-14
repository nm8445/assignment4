/*
Header Comments:
Name: Jaden Parris, Nathaniel Mais
Student ID: 100774161 and <100843860>
Date of completion: Febuary 24th, 2024
*/
"use strict";

(function (){

    // Check if the user is not logged in (no "user" item in sessionStorage)
    if (!sessionStorage.getItem("user")) {
        // Redirect the user to the login page
        location.href = "login.html";
    }

})();