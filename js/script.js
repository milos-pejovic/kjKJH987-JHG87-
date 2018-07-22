var confirmReload = true;

/**
 * Makes user confirm reload/leaving the page
 */
if (confirmReload){
  window.onbeforeunload = function() {
    return '';
  };
}

/**
 * ==================================================================================================
 * Set accordion height
 * ==================================================================================================
 * Give accordion fixed height. If combined heights of all cards are rgeated than fixed value, use that sum instead. 
 */
function setAccordionHeight() {
  var accordionHeight = 1000;
  var allCardsHeight = 0;

  // Accordion

  $('.container .card').each(function() {
      allCardsHeight += $(this).height();
  });

  if (allCardsHeight > accordionHeight){
      $('.container').height(allCardsHeight);
  } else {
      $('.container').height(accordionHeight);
  }
}

/**
 * ==================================================================================================
 * On each card expand set the accordion height again.
 * ==================================================================================================
 */
$('.accordion .quick-roll, .accordion .advanced-roll').on('mresize', function() {
  setAccordionHeight();
}).each(function(){
  $(this).data("mresize").throttle=0;
});

/**
 * ==================================================================================================
 * On document ready display/hide adeqaute arrows next to card titles
 * ==================================================================================================
 */
$(document).ready(function() {
  $('.accordion .card').each(function() {
    var element = $(this);

    if (element.find('a.card-link').hasClass('collapsed')) {
      element.find('.fas.fa-sort-up').hide();
      element.find('.fas.fa-sort-down').show();
    } else {
      element.find('.fas.fa-sort-up').show();
      element.find('.fas.fa-sort-down').hide();
    }
  });
});

/**
 * ==================================================================================================
 * On card click display/hide adeqaute arrows next to card titles
 * ==================================================================================================
 */
$('.accordion .card').on('click', function(){
  var element = $(this);

  if (!element.find('a.card-link').hasClass('collapsed')) {
    element.find('.fas.fa-sort-up').hide();
    element.find('.fas.fa-sort-down').show();
  } else {
    element.find('.fas.fa-sort-up').show();
    element.find('.fas.fa-sort-down').hide();
  }
});
