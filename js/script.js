window.onbeforeunload = function() {
	return '';
};

/**
 * ==================================================================================================
 * Set accordion height
 * ==================================================================================================
 * Give accordion fixed height. If combined heights of all cards are rgeated than fixed value, use that sum instead. 
 */
function setAccordionHeight() {
  var accordionHeight = 1000;
  var allCardsHeight = 0;
  
  $('.accordion .card').each(function() {
      allCardsHeight += $(this).height();
  });

  if (allCardsHeight > accordionHeight){
      $('.accordion').height(allCardsHeight);
  } else {
      $('.accordion').height(accordionHeight);
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