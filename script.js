$(document).ready(function() {

    // --- Smooth Scrolling for internal links ---
    // (This is useful if you add links to resume sections in your nav)
    $('a[href^="#"]').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });

    // --- Contact Form Validation ---
    $('#contact-form').on('submit', function(event) {
        // Clear previous error messages
        $('.error-message').remove();
        $('.error-border').removeClass('error-border');
        $('#form-status').empty();

        let isValid = true;
        const $form = $(this);
        const $status = $('#form-status');

        // 1. Name Check
        const $name = $('#name');
        if ($name.val().trim() === '') {
            isValid = false;
            $name.addClass('error-border');
            $name.after('<p class="error-message">Name is required.</p>');
        }

        // 2. Email Check (basic format)
        const $email = $('#email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if ($email.val().trim() === '' || !emailPattern.test($email.val())) {
            isValid = false;
            $email.addClass('error-border');
            $email.after('<p class="error-message">A valid email is required.</p>');
        }
        
        // 3. Message Check
        const $message = $('#message');
        if ($message.val().trim() === '') {
            isValid = false;
            $message.addClass('error-border');
            $message.after('<p class="error-message">Message cannot be empty.</p>');
        }

        // If form is not valid, stop submission
        if (!isValid) {
            event.preventDefault();
            $status.html('<p class="error">Please correct the errors above.</p>');
        } else {
            // --- This is where you would normally send data with AJAX ---
            // Since this is a static site, we will just simulate success.
            event.preventDefault(); // Stop actual submission
            
            $status.html('<p class="success">Thank you for your message! (This is a demo and no data was sent)</p>');
            $form[0].reset(); // Clear the form
        }
    });


    // --- Resume Page: Fade in sections on scroll ---
    const $resumeSections = $('.resume-section');
    if ($resumeSections.length > 0) { // Only run if on resume page
        const $window = $(window);

        const checkInView = () => {
            const windowHeight = $window.height();
            const windowTop = $window.scrollTop();
            const windowBottom = windowTop + windowHeight;

            $.each($resumeSections, function() {
                const $element = $(this);
                const elementTop = $element.offset().top;
                const elementBottom = elementTop + $element.outerHeight();

                // If element is partially in view
                if ((elementBottom >= windowTop) && (elementTop <= windowBottom)) {
                    $element.addClass('is-visible');
                }
            });
        };

        // Run on load and on scroll
        checkInView();
        $window.on('scroll', checkInView);
    }

});
