/*
 * Change Navbar color while scrolling
 */

$(window).scroll(function() {
    handleTopNavAnimation();
});

$(window).load(function() {
    handleTopNavAnimation();
});

function handleTopNavAnimation() {
    var top = $(window).scrollTop();

    if (top > 10) {
        $('#site-nav').addClass('navbar-solid');
    } else {
        $('#site-nav').removeClass('navbar-solid');
    }
}

/*
 * Registration Form
 */

$('#registration-form').submit(function(e) {
    e.preventDefault();

    var postForm = { //Fetch form data
        'EventName': 'MenConferenceFeb2017',
        'FirstName': $('#registration-form #fname').val(),
        'LastName': $('#registration-form #lname').val(),
        'EmailAddress': $('#registration-form #email').val(),
        'Phone': $('#registration-form #cell').val(),
        'NumberOfAdults': $('#registration-form #adults').val(),
        'NumberOfChildren': $('#registration-form #children').val(),
        'Address': $('#registration-form #address').val(),
        'State': $('#registration-form #state').val(),
        'City': $('#registration-form #city').val(),
        'Country': $('#registration-form #country').val(),
        'Transportation': $('#registration-form #transportation').val(),
        'ChurchName': $('#registration-form #churchName').val(),
        'Comments': $('#registration-form #comment').val()
    };

    $.ajax({
        type: 'POST',
        url: 'https://cmfi-conference.azurewebsites.net/api/PostRegistration',
        data: postForm,
        contentType: 'application/json',
        success: function(data) {
            $('#registration-msg .alert').html("Registration Successful. Thank you for registering");
            $('#registration-msg .alert').removeClass("alert-danger");
            $('#registration-msg .alert').addClass("alert-success");
            $('#registration-msg').show();
            $('#registration-form input').val('');
            $('#registration-form textarea').val('');
        },
        error: function(error) {
            {
                $('#registration-msg .alert').html("Sorry an error occurred while submitting your resgistration!");
                $('#registration-msg .alert').removeClass("alert-success");
                $('#registration-msg .alert').addClass("alert-danger");
                $('#registration-msg').show();
            }
        }
    });
});

/*
 * SmoothScroll
 */

smoothScroll.init();