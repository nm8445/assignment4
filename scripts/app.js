/*
Header Comments:
Name: Jaden Parris, Nathaniel Mais
Student ID: 100774161 and <100843860>
Date of completion: Febuary 24th, 2024
*/

"use strict";

// IIFE - Immediately Invoked Functional Expression
(function(){
    // Function to display the gallery page
    function DisplayGalleryPage() {
        console.log("Called DisplayGalleryPage()");
        // Fetch image data from JSON file and populate the gallery
        $.getJSON('./data/gallery.json', function(data) {
            let images = data.images;
            let galleryContent = '<div class="row">';
            // Iterate through each image and create HTML elements
            $.each(images, function(index, image) {
                galleryContent += '<div class="col-md-4"><a href="#" data-bs-toggle="modal" data-bs-target="#lightbox" data-img-src="' + image.src + '"><img src="' + image.src + '" alt="' + image.alt + '" class="img-fluid"></a></div>';
                // Create a new row after every 3 images
                if ((index + 1) % 3 === 0 && index + 1 < images.length) {
                    galleryContent += '</div><div class="row">';
                }
            });
            galleryContent += '</div>';
            $('.gallery').html(galleryContent);
        });

        // Lightbox functionality
        $('.gallery').on('click', 'a', function(e) {
            e.preventDefault();
            let imgSrc = $(this).data('img-src');
            $('#lightbox-img').attr('src', imgSrc);
        });
    }
    // Function to setup logout listener
    function setupLogoutListener() {
        $("#logout").on("click", function() {
            sessionStorage.clear();
            location.href = "login.html";
        });
    }
    // Function to check if user is logged in
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(`<a class="nav-link" id="logout" href="#">
                            <i class="fa fa-sign-out-alt"></i> Logout</a>`);

            $("#logout").on("click", function(){

                sessionStorage.clear();
                location.href = "login.html";
                setupLogoutListener();

            })
        }
    }
    // Function to make an AJAX request
    function AjaxRequest(method, url, callback, data = null) {
        // Check if the request is for submitting form data to localStorage
        if (url === 'submit_to_localStorage') {
            if (method === 'POST' && data !== null) {
                // Create a unique key for the form data
                let key = 'formData_' + Date.now();
                // Store the form data in localStorage
                localStorage.setItem(key, JSON.stringify(data));
                // Call the callback function with a success message
                callback({ status: 'success', message: 'Form data submitted successfully' });
            } else {
                // Call the callback function with an error message
                callback({ status: 'error', message: 'Invalid request for submitting form data' });
            }
        } else {
            // Handle regular AJAX requests (e.g., for fetching data)
            let xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.addEventListener('load', function() {
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                } else {
                    callback(null, 'Error: ' + xhr.status);
                }
            });
            xhr.addEventListener('error', function() {
                callback(null, 'Error: Network error');
            });
            xhr.send();
        }
    }


    function registerFormValidation(){

        //fullName

        ValidateField("#fullName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Please enter a valid full name");

        //contactNumber
        ValidateField("#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid contact number");

        //emailAddress
        ValidateField("#emailAddress",
            /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address");

        ValidateField("#Address",
            /^[a-zA-Z0-9\s,.'-]{3,}$/,
            "Please enter a valid house address");

    }

    function ValidateField(input_field_id, regular_expression, error_message ){

        let messageArea =$("#messageArea").hide();

        $(input_field_id).on("blur", function (){

            let inputFieldText = $(this).val();

            if(!regular_expression.test(inputFieldText)){
                //full name does not success Pattern Matching
                $(this).trigger("focus"). trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();

            } else{
                //fullName is successful
                messageArea.removeAttr("class").hide();

            }


        });
    }
    // Function to load header HTML

    function LoadHeader(html_data)
    {
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
        CheckLogin();
    }
    function DisplayContactListPage(){
        console.log("Called DisplayHomePage()");
        if(localStorage.length> 0 ){

            let contactList = document.getElementById("contactList");
            let data = "";

            let keys = Object.keys(localStorage);

            let index = 1;
            for(const key of keys){
                let contact = new Contact();
                let contactData = localStorage.getItem(key);
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                            <td>${contact.fullName}</td>
                            <td>${contact.contactNumber}</td>
                            <td>${contact.emailAddress}</td>
                            <td></td>
                            <td></td> 
                          </tr>`;
                index++;
            }
            contactList.innerHTML= data;
        }
    }

    function DisplayAboutPage(){
        console.log("Called DisplayHomePage()");
    }

    function DisplayProductsPage(){
        console.log("Called DisplayHomePage()");
    }

    function DisplayServicesPage(){
        console.log("Called DisplayHomePage()");
    }

    function DisplayContactPage() {
        console.log("Called DisplayContactPage()");

        let sendButton = document.getElementById("sendButton");
        let subscribeButton = document.getElementById("subscribeButton"); // Make sure this is the correct ID

        sendButton.addEventListener("click", function() {
            if (subscribeButton.checked) {
                let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
                if (contact.serialize()) {
                    let key = contact.fullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });

        // Add the feedback form submission handler
        $('#feedbackForm').on('submit', function(event) {
            event.preventDefault();
            let feedback = $('#FeedbackSection').val();
            let formData = { feedback: feedback };

            AjaxRequest('POST', 'submit_to_localStorage', function(response) {
                console.log(response.message);
                $('#feedbackForm').hide();
                $('#thankYouMessage').show();
            }, formData);
        });

    }

    function DisplayEventsPage() {
        console.log("Called DisplayEventsPage()");
        // Make an AJAX request to load event data from JSON file
        AjaxRequest('GET', './data/events.json', function(data, error) {
            if (error) {
                console.error('Error loading events data:', error);
                return;
            }
            let events = JSON.parse(data).events;
            let eventsContent = '<div class="events-list">';
            // Iterate through each event and create HTML elements
            events.forEach(function(event) {
                eventsContent += '<div class="event"><h3>' + event.name + '</h3><p>Date: ' + event.date + '</p><p>Location: ' + event.location + '</p><p>Description: ' + event.description + '</p></div>';
            });
            eventsContent += '</div>';
            $('.events').html(eventsContent);
        });
    }

    function DisplayLoginPage(){
        console.log("Called DisplayLoginPage");

        // Hide the message area initially
        let messageArea = $("#messageArea");
        messageArea.hide();

        // Add click event listener for the login button
        $("#loginButton").on("click", function(){

            let username = $("#username").val(); // Fetch the username from input field
            let password = $("#password").val(); // Fetch the password from input field
            let success = false; // Flag to indicate successful login
            let newUser = new core.User(); // Create a new user object

            // Fetch user data from JSON file
            $.get("./data/users.json", function(data){

                // Iterate through each user in the data
                for(const user of data.users) {
                    // Check if the entered username and password match
                    if (username === user.Username && password === user.Password) {
                        newUser.fromJSON(user); // Populate the newUser object with user data
                        success = true; // Set success flag to true
                        break; // Exit the loop
                    }
                }

                if (success) {
                    // If login is successful, store user data in sessionStorage
                    sessionStorage.setItem("user", JSON.stringify(newUser));
                    sessionStorage.setItem("showWelcomeMessage", "true"); // Set a flag to show a welcome message
                    messageArea.removeAttr("class").hide(); // Hide the message area
                    location.href = "index.html"; // Redirect to the index page
                }
                else {
                    // If login is unsuccessful, show an error message
                    $("#username").trigger("focus").trigger("select"); // Focus and select the username input
                    messageArea.addClass("alert alert-danger") // Add the 'alert-danger' class to the message area
                        .text("Error: Invalid Credentials") // Set the error message text
                        .show(); // Show the message area
                }
            });
        });
    }
    // Function to start the application
    function Start(){
        console.log("App Started");

        AjaxRequest("GET", "header.html", LoadHeader);
        // Check if a user is logged in and display the welcome message
        let user = sessionStorage.getItem("user");
        let showWelcomeMessage = sessionStorage.getItem("showWelcomeMessage");
        if (user && showWelcomeMessage === "true") {
            user = JSON.parse(user); // Parse the user data from JSON
            $('#welcomeMessage').html('<div class="alert alert-success">Welcome, ' + user.DisplayName + '!</div>');
            setTimeout(function() {
                $('#welcomeMessage').fadeOut('slow');
            }, 5000);
            sessionStorage.setItem("showWelcomeMessage", "false"); // Update the flag
        }
        switch(document.title){

            case "Products":
                DisplayProductsPage();
                break;

            case "Services":
                DisplayServicesPage();
                break;

            case "About Us":
                DisplayAboutPage();
                break;

            case "Contact Us":
                DisplayContactPage();
                break;

            case "Contact List":
                DisplayContactListPage();
                break;
            case "Gallery":
                DisplayGalleryPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;

            case "Register":
                registerFormValidation();
                break;
            case "Events": // Add a case for the "Events" page title
                DisplayEventsPage();
                break;
        }
    }
    window.addEventListener( "load", Start);
})(); // This is how you declare a function