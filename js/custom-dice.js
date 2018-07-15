var existingDiceSizes = [2, 3, 4, 6, 8, 10, 12, 20, 30, 100];

/**
 * ==================================================================================================
 * Makes new dice html element
 * ==================================================================================================
 * @param {int} diceSidesNumber 
 */
function makeNewCustomDiceHtmlElement(diceSidesNumber) {
  var newDiceElement = $('.elements-repository .custom-dice-button-repo').html();
  newDiceElement = newDiceElement.replace(/diceSizeNumber/g, diceSidesNumber);
  $('.custom-dice-buttons').append(newDiceElement);
  $('.custom-dice-buttons [class="custom-dice-' + diceSidesNumber + '"]').on('click', function() {
      $('.result').html(roll(diceSidesNumber));
  });
}

/**
 * ==================================================================================================
 * Make custom dice
 * ==================================================================================================
 */
$('.make-custom-dice').on('click', function(){
  var diceSidesNumber = prompt('How many sides should the dice have?');
  diceSidesNumber = diceSidesNumber.replace(/[^0-9]/gi, '');
  diceSidesNumber = parseInt(diceSidesNumber);

  // Max dice size 9999
  if (diceSidesNumber > 9999) {
    alert('Please enter a number lower than 10000');
    return;
  }

  // Check if dice already exists
  if (existingDiceSizes.indexOf(diceSidesNumber) != -1){
      if (!confirm('Dice already exists.\nCreate anyway?')) {
          return;
      }
  }
  
  if (existingDiceSizes.indexOf(diceSidesNumber) == -1) {
    existingDiceSizes.push(diceSidesNumber);
  }

  makeNewCustomDiceHtmlElement(diceSidesNumber);
  addEventHandlersToAllDice();
});

/**
 * ==================================================================================================
 * Checks if a custom dice exists
 * ==================================================================================================
 * @param {int} diceSize 
 */
function customDiceExists(diceSize) {
  var diceExists = false;

  $('.custom-dice-buttons button').each(function(){
    if (parseInt($(this).attr('data-dicesize')) == diceSize){
      diceExists = true;
    }
  });

  return diceExists;
}

/**
 * ==================================================================================================
 * Remove custom dice handler
 * ==================================================================================================
 */
$('.custom-dice-buttons').delegate('button i', 'click', function() {
  var diceSize = $(this).parent('button').attr('data-diceSize');
  var confirmCustomDiceRemoval = confirm('Remove custom dice d' + diceSize + '?');
  diceSize = parseInt(diceSize);

  if (confirmCustomDiceRemoval) {
    $(this).parent('button').remove();
    if (!customDiceExists(diceSize)) {
      removeFromArray(existingDiceSizes, diceSize);
    }
  }
});
