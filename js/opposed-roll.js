/**
 * ==================================================================================================
 * Roll selected opposed dice
 * ==================================================================================================
 */
function rollOpposedDice() {
  var leftDiceSize = $('.left-dice div').attr('data-dicesize');
  var rightDiceSize = $('.right-dice div').attr('data-dicesize');
  var leftResult = roll(leftDiceSize);
  var rightResult = roll(rightDiceSize);

  $('.opposed-roll-results .left-result').html(leftResult);
  $('.opposed-roll-results .right-result').html(rightResult);
}

/**
 * ==================================================================================================
 * Opposed roll added buttons click handler
 * ==================================================================================================
 */
$('.opposed-roll-results').delegate('.left-dice div, .right-dice div', 'click', function() {
  rollOpposedDice();
})

/**
 * ==================================================================================================
 * Opposed roll added buttons click handler
 * ==================================================================================================
 */
$('.opposed-roll-results').delegate('.left-dice div, .right-dice div', 'contextmenu', function(e) {
  e.preventDefault();
  rollOpposedDice();
})
