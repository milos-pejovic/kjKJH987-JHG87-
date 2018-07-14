/**
 * ==================================================================================================
 * Limit number of dice for dice pool
 * ==================================================================================================
 */
$('#how-many-dice-input, #crittical-hit-treshold, #success-treshold, #crittical-miss-treshold').on('input', function() {
  if (Number.parseInt($(this).val()) > 1000) {
      $(this).val('1000');
  }

  if (Number.parseInt($(this).val()) < 0) {
      $(this).val('0');
  }
});

/**
* ==================================================================================================
* Validate dice pool entries
* ==================================================================================================
* @param {int} diceSize 
* @param {int} critticalHitTreshold 
* @param {int} successTreshold 
* @param {int} critticalMissTreshold 
* @return boolean
*/
function validateDicePoolEntries(diceSize, critticalHitTreshold, successTreshold, critticalMissTreshold) {
  var errorsUlElement = $('.dice-pool-work-area .warnings .warnings-list');
  var errors = [];
  var errorsHtml = '';
  var fieldEntriesValid = true;

  errorsUlElement.html('');

  // Validate fields

  if (isNaN(successTreshold)) {
      errors.push('Please enter success treshold.');
  }

  if (critticalHitTreshold != '' && critticalHitTreshold > diceSize) {
      errors.push('Crittical hit treshold must be equal to or lower than dice size.');
  }

  if (critticalHitTreshold != '' && critticalHitTreshold < successTreshold) {
      errors.push('Crittical hit treshold must be equal to or higher than success treshold.');
  }

  if (successTreshold > diceSize) {
      errors.push('Success treshold must be equal to or lower than dice size.');
  }

  if (critticalMissTreshold != '' && (critticalMissTreshold >= diceSize || critticalMissTreshold >= critticalHitTreshold)) {
      errors.push('Crittical miss treshold must be lower than success and crittical hit tresholds.');
  }

  // Handle errors
  if (errors.length > 0) {
      for (var i = 0; i < errors.length; i++) {
          errorsHtml += '<li>'+errors[i]+'</li>';
      }
      errorsUlElement.html(errorsHtml);
      fieldEntriesValid = false;
  }

  return fieldEntriesValid;
}

/**
* ==================================================================================================
* Roll dice pool
* ==================================================================================================
* @param {int} diceSize 
* @param {int} critticalHitTreshold 
* @param {int} successTreshold 
* @param {int} critticalMissTreshold 
*/
function rollDicePool(diceSize, critticalHitTreshold, successTreshold, critticalMissTreshold) {
  var numberOfDice = parseInt($('#how-many-dice-input').val()); 
  var critticalSuccesses = [];
  var regularSuccesses = [];
  var regularFailures = [];
  var critticalFailures = [];

  // Roll dice
  for (var i = 0; i < numberOfDice; i++) {
      var rollResult = roll(diceSize);

      if (critticalHitTreshold != NaN && rollResult >= critticalHitTreshold) {
          critticalSuccesses.push(rollResult);
      } else if (rollResult >= successTreshold) {
          regularSuccesses.push(rollResult);
      } else if (critticalMissTreshold != NaN && rollResult <= critticalMissTreshold) {
          critticalFailures.push(rollResult);
      } else {
          regularFailures.push(rollResult);
      }
  }

  // Sort results
  critticalSuccesses.sort(compareNumbers).reverse();
  regularSuccesses.sort(compareNumbers).reverse();
  regularFailures.sort(compareNumbers).reverse();
  critticalFailures.sort(compareNumbers).reverse();

  // Display results
  dispalyDicePollResults(critticalSuccesses, regularSuccesses, regularFailures, critticalFailures);
}

/**
* ==================================================================================================
* Displays dice pool results
* ==================================================================================================
* @param {int} critticalSuccesses 
* @param {int} regularSuccesses 
* @param {int} regularFailures 
* @param {int} critticalFailures 
*/
function dispalyDicePollResults(critticalSuccesses, regularSuccesses, regularFailures, critticalFailures) {
  var critticalSuccessesHtmlResult = '';
  var regularSuccessesHtmlResult = '';
  var regularFailuresHtmlResult = '';
  var critticalFailuresHtmlResult = '';

  if (critticalSuccesses.length > 0) {
      critticalSuccessesHtmlResult = critticalSuccesses.join(', ');
  }

  if (regularSuccesses.length > 0) {
      regularSuccessesHtmlResult = regularSuccesses.join(', ');
  }

  if (regularFailures.length > 0) {
      regularFailuresHtmlResult = regularFailures.join(', ');
  }

  if (critticalFailures.length > 0) {
      critticalFailuresHtmlResult = critticalFailures.join(', ');
  }

  $('.crittical-successes-results-field').html(critticalSuccessesHtmlResult);
  $('.regular-successes-results-field').html(regularSuccessesHtmlResult);
  $('.regular-failures-results-field').html(regularFailuresHtmlResult);
  $('.crittical-failures-results-field').html(critticalFailuresHtmlResult);

  $('.success-total-span').html('(' + (critticalSuccesses.length + regularSuccesses.length) + ')');
  $('.crittical-success-span').html('(' + critticalSuccesses.length + ')');
  $('.regular-total-span').html('(' + regularSuccesses.length + ')');
  $('.failure-total-span').html('(' + (regularFailures.length + critticalFailures.length)  + ')');
  $('.regular-failure-span').html('(' + regularFailures.length + ')');
  $('.crittical-failure-span').html('(' + critticalFailures.length + ')');
}

/**
* ==================================================================================================
* Dice pool chosen dice click handler
* ==================================================================================================
*/
$('.dice-pool-work-area .chosen-dice').delegate('button', 'click', function() {
  var diceSize = parseInt($('.dice-pool-work-area .chosen-dice button').attr('data-dicesize'));
  var critticalHitTreshold = parseInt($('#crittical-hit-treshold').val());
  var successTreshold = parseInt($('#success-treshold').val());
  var critticalMissTreshold = parseInt($('#crittical-miss-treshold').val());
  var fieldsValid = validateDicePoolEntries(diceSize, critticalHitTreshold, successTreshold, critticalMissTreshold);

  if (fieldsValid) {
      rollDicePool(diceSize, critticalHitTreshold, successTreshold, critticalMissTreshold);
  }
});
