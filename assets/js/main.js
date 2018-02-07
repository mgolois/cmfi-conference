/*
 * Change Navbar color while scrolling
 */
var eventName = 'RevivalConference2018';
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
var RegistrationViewModel = function(){
    self = this;
    self.unitPrice = ko.observable(45.00);
    self.quantity = ko.observable(1);
    self.attendees = ko.observableArray([""]);
    self.total = ko.pureComputed(function() {
        var price = self.unitPrice() * self.quantity();
        return price !== undefined ? "$"+price.toFixed(2) : "$0.00";
    }, self);
    
    self.quantityChange = function(data,event){
        self.attendees([]);
        for(var i=0; i< self.quantity(); i++){
            self.attendees.push("");
        }
    };
}

ko.applyBindings(new RegistrationViewModel());

$('#registration-form').submit(function(e) {

    $("#veil").show();
    e.preventDefault();

    var postForm = { //Fetch form data
        'EventName': eventName,
        'FirstName': $('#registration-form #firstName').val(),
        'LastName': $('#registration-form #lastName').val(),
        'EmailAddress': $('#registration-form #email').val(),
        'Phone': $('#registration-form #phone').val(),
        'NumberOfAdults': $('#registration-form #adults').val(),
        'NumberOfChildren': $('#registration-form #children').val(),
        'Address': $('#registration-form #address').val(),
        'State': $('#registration-form #state').val(),
        'City': $('#registration-form #city').val(),
        'Country': $('#registration-form #country').val(),
        'Transportation': $('#registration-form #transportation').val(),
        'ChurchName': $('#registration-form #churchName').val(),
        'Comments': $('#registration-form #comment').val(),
        'Sessions': $('#registration-form input[name=sessions]').val(),
    };

    $.ajax({
        type: 'POST',
        url: 'https://cmfi-conference.azurewebsites.net/api/PostRegistration',
        data: JSON.stringify(postForm),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(data) {

            $('#registration-msg .alert').html("Your registration was successfully submitted. Thank you for registering!");
            $('#registration-msg .alert').removeClass("alert-danger");
            $('#registration-msg .alert').addClass("alert-success");
            $('#registration-msg').show();
            $('#registration-form input').val('');
            $('#registration-form textarea').val('');
            $("#veil").hide()
        },
        error: function(error) {
            {
                $('#registration-msg .alert').html("Sorry an error occurred while submitting your resgistration!");
                $('#registration-msg .alert').removeClass("alert-success");
                $('#registration-msg .alert').addClass("alert-danger");
                $('#registration-msg').show();
                $("#veil").hide()
            }
        }
    });
});

$("#contact-form").submit(function(e) {

    $("#veil").show();
    e.preventDefault();

    var postForm = { //Fetch form data
        'EventName': eventName,
        'FirstName': $('#contact-form #firstName').val(),
        'LastName': $('#contact-form #lastName').val(),
        'EmailAddress': $('#contact-form #email').val(),
        'Phone': $('#contact-form #phone').val(),
        'Comments': $('#contact-form #comment').val()
    };

    $.ajax({
        type: 'POST',
        url: 'https://cmfi-conference.azurewebsites.net/api/PostContactForm',
        data: JSON.stringify(postForm),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(data) {

            $('#contact-msg .alert').html("Thank you for contacting us. We will reply by email or phone shortly.");
            $('#contact-msg .alert').removeClass("alert-danger");
            $('#contact-msg .alert').addClass("alert-success");
            $('#contact-msg').show();
            $('#contact-form input').val('');
            $('#contact-form textarea').val('');
            $("#veil").hide()
        },
        error: function(error) {
            {
                $('#contact-msg .alert').html("Sorry, an error occurred while submitting your request!");
                $('#contact-msg .alert').removeClass("alert-success");
                $('#contact-msg .alert').addClass("alert-danger");
                $('#contact-msg').show();
                $("#veil").hide()
            }
        }
    });
});
/*
 * SmoothScroll
 */

smoothScroll.init();