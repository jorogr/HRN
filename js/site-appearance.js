///////////////////////////////
/* Defining functions START */
/////////////////////////////

/* Scroll functions START */
// This function scrolls the page to top
function scrollToTop() {
    // animated scroll to top
    $('body, html').animate({
	scrollTop: 0
    }, {
	duration: 1000
    });
};

// This function is called by an click event
// on a button with class 'menuItem' and href
// which begins with '#'
// It scrolls the page to the wanted section
function scrollPage(e, that) {
    // get ID of element to scroll
    var id = $(that).attr('href');
    
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
    // and the resolution
    var w = window.innerWidth
	    || document.documentElement.clientWidth
	    || document.body.clientWidth;
    if ( id === '#footer' ) {
	var position = element.offset().top;
    } else if ( w > 1919 )  {
	var position = Number(element.offset().top) - ((w*3.90625)/100);
    } else {
	var position = Number(element.offset().top) - 75;
    }
    
    // animated scrolling
    $('body, html').animate({
	scrollTop: position
    }, {
	duration: 1000
    });
};
/* Scroll functions END */


//  This function shows and hide the 'scrollToTop' button
// Started on every single scroll of the page
function showScrollButton() {
    // Taking how much pixels from the top are scrolled
    var scrolledFromTop = $(window).scrollTop();
    
    // Shows the scrollButton if 500px or more
    // from the top of the page are scrolled down
    if ( scrolledFromTop >= 500 ) {
	$('#scrollToTop').fadeIn(500);
    } else {
	$('#scrollToTop').fadeOut(500);
    }
};


/* Animation functions START */
// This function starts the auto animation process 
// of HoverOn/HoverOff effect of the icons
// First, we define gobal variables to track the animation state
var nextSeq = 0;
var prevSeq = 0;
var interval = null;
function hoverIcons() {
    // Get all elements with a specific class, that we need to animate
    var iconsToAnimate = $('.animated-icons');
    
    // Start the changing-class function on 1.5s interval
    interval = setInterval( function() {
	if ( nextSeq >= iconsToAnimate.length ){
	    iconsToAnimate[prevSeq].classList.remove('hover');
	    iconsToAnimate[0].classList.add('hover');
	    prevSeq = 0;
	    nextSeq = 1;
	    return;
	}
	
	// Changing the classes of the icons
	iconsToAnimate[prevSeq].classList.remove('hover');
	iconsToAnimate[nextSeq].classList.add('hover');
	
	// Sets icons sequence numbers for the next interval
	prevSeq = nextSeq;
	nextSeq++;
    }, 1500);
};

// This function stops the auto animation process 
function clearHoverIcons() {
    // Clear icon 'hover' class
    $('.animated-icons.hover').removeClass('hover');
    
    // Stops the looped code, started in hoverIcons();
    clearInterval(interval);
};
/* Animation functions END */


// This function show and hide the mobile nav
// while on mobile device or small resolution
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
};


/* Modal functions START */
// This function show modals on click
// on an element with class 'modal-open'
function openModal() {
    // Take the ID of the modal which the user
    // wants to see, based on clicked element's ID
    var modalId = $(this).attr('id') + '-modal';
    var theModal = $('#' + modalId);
    
    // Showing the modal
    theModal.fadeIn(250);
};

// This function close modals on click
function closeModal() {
    // Check if it's a modal with video
    if ( $(this).hasClass('modal-video-close') ) {
	// Replace the iframe src. This reset the video and stop it
	var videoUrl = $('#watchTrailer-video').attr("src");
	$('#watchTrailer-video').attr("src", videoUrl);
    }
    
    // Close the opened modal
    var modal = $(this).parents('.modal');
    modal.fadeOut(250);
};
/* Modal functions END */


// This function changes the content of the paragraph
// in the second section of the page
function changeParagraph() {
    // Take the ID of the paragraph which the user
    // wants to see, based on clicked icon's ID
    var clickedIconId = $(this).attr('id');
    var paragraph = clickedIconId.substr(0, clickedIconId.indexOf('-'));
    var paragraphContent = $('#' + paragraph + '-paragraph');
    
    if ( paragraphContent.hasClass('visible') ) {
	// If the wanted paragraph is already visible
	// stops the function
	return;
    }
    
    // First, hide the visible paragraph and change classes
    $('.paragraph.visible').fadeOut(1000);
    setTimeout(function() {
	$('.paragraph.visible').addClass('invisible').removeClass('visible');
    }, 1000);
    // Then, show the paragraph the user want and change classes
    setTimeout(function() {
	paragraphContent.fadeIn(1000);
	paragraphContent.removeClass('invisible').addClass('visible');
    }, 1000);
};

/////////////////////////////
/* Defining functions END */
///////////////////////////

/////////////////////////////////////////////
/* Call funtions on specific events START */
///////////////////////////////////////////
$(document).ready(hoverIcons);
$(document).on('click', 'a[href^="#"].menuElement', function(e) { scrollPage(e, this); });
$(window).on('scroll', showScrollButton);
$('#scrollToTop').on('click', scrollToTop);
$('.animated-icons').on('mouseenter', clearHoverIcons);
$('.animated-icons').on('mouseleave', hoverIcons);
$('.modal-open').on('click', openModal);
$('.modal-close').on('click', closeModal);
$('.mobile-menuElement').on('click', showHideMobileNav);
$('.animated-icons').on('click', changeParagraph);
///////////////////////////////////////////
/* Call funtions on specific events END */
/////////////////////////////////////////