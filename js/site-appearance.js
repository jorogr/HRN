/* Define functions */
/* Scroll to top */
function scrollToTop() {
    // animated scroll to top
    $('body, html').animate({
	scrollTop: 0
    });
};

/* Call funtions */
/* Scroll to current section */
$(document).on('click', 'a[href^="#"].menuElement', function(e) {
    // get ID of element to scroll
    var id = $(this).attr('href');
    
    if ( id === '#home' ) {
	scrollToTop();
    }
	
    // target element to scroll
    var element = $(id);
    if ( element.length === 0 ) {
	return;
    }

    // prevent standard hash navigation
    e.preventDefault();

    // top position relative to the document
    if ( id === '#footer' ) {
	var position = element.offset().top;
    } else {
	var position = Number(element.offset().top) - 75;
    }
    
    // animated scrolling
    $('body, html').animate({
	scrollTop: position
    });
});