/**
 * ==================================================================================================
 * Clicking the "Privacy" link opens the "Privacy section"
 * ==================================================================================================
 */
$('.header #privacy-link').on('click', function() {
  $('.cookie-banner').slideDown(500);
});

/**
 * ==================================================================================================
 * Opening the "Provacy" section on load
 * ==================================================================================================
 */

function showCookieBanner() {
  if ($('.cookie-banner').length) {
    $('.cookie-banner').slideDown(500);
  }
}

setTimeout('showCookieBanner()', 100);

/**
 * ==================================================================================================
 * "Privacy" section "Close" button click event handler
 * ==================================================================================================
 */
$('#close-cookie-banner').on('click', function() {
  $('.cookie-banner').slideUp(500);
});
