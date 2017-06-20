/* Define functions */
/* Scroll to top */
function scrollToTop() {
    // animated scroll to top
    $('body, html').animate({
	scrollTop: 0
    }, {
	duration: 1000
    });
};
/* Show and hide scrollToTop button */
function showScrollButton() {
    var scrolledFromTop = $(window).scrollTop();
    if ( scrolledFromTop >= 700 ) {
	$('#scrollToTop').fadeIn(500);
    } else {
	$('#scrollToTop').fadeOut(500);
    }
}
/* Start auto HoverOn/HoverOff icons */
/* Gobal variables to manipulate the animation */
var nextSeq = 0;
var prevSeq = 0;
var interval = null;
function hoverIcons() {
    // Get all elements with a specific class, that we need to animate
    var iconsToAnimate = $('.animated-icons');
    // Start the changing-class function on 2s interval
    interval = setInterval( function() {
	if ( nextSeq >= iconsToAnimate.length ){
	    iconsToAnimate[prevSeq].classList.remove('hover');
	    iconsToAnimate[0].classList.add('hover');
	    prevSeq = 0;
	    nextSeq = 1;
	    return;
	}
	iconsToAnimate[prevSeq].classList.remove('hover');
	iconsToAnimate[nextSeq].classList.add('hover');
	prevSeq = nextSeq;
	nextSeq++;
    }, 1500);
}
/* Stop auto HoverOn/HoverOff icons */
function clearHoverIcons() {
    $('.animated-icons.hover').removeClass('hover');
    clearInterval(interval);
}
function showHideMobileNav() {
    if ( $('#mobNavButton').hasClass('closed-nav') === true ) {
	$('#mobNavButton').removeClass('closed-nav').addClass('opened-nav');
	$('#mobNavIcon').removeClass('icon-navigation').addClass('icon-cross');
	$('#mobileMenu').slideDown(500);
    } else {
	$('#mobNavButton').removeClass('opened-nav').addClass('closed-nav');
	$('#mobNavIcon').removeClass('icon-cross').addClass('icon-navigation');
	$('#mobileMenu').slideUp(500);
    }
}
function callModal() {
    
}

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
    }, {
	duration: 1000
    });
});

/* Scroll to top */
$('#scrollToTop').on('click', scrollToTop);
$(window).on('scroll', showScrollButton);
$(document).ready(hoverIcons);
$('.animated-icons').on('mouseenter', clearHoverIcons);
$('.animated-icons').on('mouseleave', hoverIcons);
$('.call-modal').on('click', callModal);
$('.mobile-menuElement').on('click', showHideMobileNav);