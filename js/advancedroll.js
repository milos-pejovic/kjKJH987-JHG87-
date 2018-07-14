var workArea = $('.work-area');

/**
 * ==================================================================================================
 * Math operations buttons click event handler
 * ==================================================================================================
 */
$('.math-controls button.math-operation').on('click', function(e){
  var operation = $(this).attr('data-operation');
  var elementToAdd = $('.elements-repository .' + operation + '-repo').html();
  workArea.append(elementToAdd);
});

/**
 * ==================================================================================================
 * Advanced roll segment "X" click event handler
 * ==================================================================================================
 */
$('body').delegate('.adv-roll-segment .close', 'click', function( ){
  $(this).parent('.adv-roll-segment').remove();
});

/**
 * ==================================================================================================
 * Limit roll segment input
 * ==================================================================================================
 */
$('body').delegate('.adv-roll-segment input', 'input', function(evt){
  var value = $(this).val();

  // Prevent dot occuring in strings like "3.3."
  if (value.indexOf('.') != -1) {
    value = value.split('.');
    value[1] = value[1].replace('.', '');
    value = value[0] + '.' + value[1];
  }

  // If "." is present prevet "d" from showing
  if (value.indexOf('.') != -1 && evt.originalEvent.data == 'd') {
    value = value.replace('d', '');
  }

  // If "d" is present prevet "." from showing
  if (value.indexOf('d') != -1 && evt.originalEvent.data == '.') {
    value = value.replace('.', '');
  }

  value = value.replace(/[^0-9d\.]/gi,'');
  value = value.replace(/dd/gi,'d');
  value = value.replace(/\Bd/gi,'');
  value = value.replace(/\.\./gi,'.');
  value = value.replace(/\B\./gi,'');

  $(this).val(value);
});

/**
 * ==================================================================================================
 * numberOrRoll
 * ==================================================================================================
 * Checks whether the input is a number or dice definition (e.g. d20).
 * If dice definition, rolls the dice and returns the result.
 * @param {string} input 
 */
function numberOrRoll(input) {
  if (input[0] == 'd') {
    input = parseInt(input.slice(1));
    return roll(input);
  } else {
    return parseFloat(input);
  }
}

/**
 * ==================================================================================================
 * Shows the result that is integer
 * ==================================================================================================
 * @param {integer} result 
 */
function showIntegerAdvancedResult(result) {
  $('.adv-roll-result p').html(result);
}

/**
 * ==================================================================================================
 * Shows the result that is float
 * ==================================================================================================
 * @param {float} result 
 */
function showFloatAdvancedResult(result) {
  var numberOfDecimals = $('.number-of-decimals').val();
  if (numberOfDecimals > 10) {
    numberOfDecimals = 10;
  }
  $('.adv-roll-result p').html(result.toFixed(numberOfDecimals));
}

/**
 * ==================================================================================================
 * showResult
 * ==================================================================================================
 * @param {string} result 
 */
function showResult(result) {
  var roundUp = $('.round-up').is(':checked');
  var roundDown = $('.round-down').is(':checked'); 

  if (isNaN(result)) {
    $('.adv-roll-result p').html('/');
  } else if (Number.isInteger(result)) {
    result = Math.trunc(parseInt(result));
    showIntegerAdvancedResult(result);
  } else {
    if (roundUp) {
      result = Math.trunc(Math.ceil(result));
      showIntegerAdvancedResult(result);
    } else if (roundDown) {
      result = Math.trunc(Math.floor(result));
      showIntegerAdvancedResult(result);
    } else {
      showFloatAdvancedResult(result);
    }
  }
}

/**
 * ==================================================================================================
 * Validate segment fields
 * ==================================================================================================
 */
function validateSegmentEntries() {
  var fieldsValid = true;
  var emptyfields = false;
  var fieldsWithOnlyD = false;
  var errors = [];
  var errorsHtml = '';

  $('.advanced-roll .warnings').html('');

  $('.container .adv-roll-segment input').each(function() {
    var fieldValue = $(this).val();

    if (fieldValue == '') {
      emptyfields = true;
    }

    if (fieldValue == 'd') {
      fieldsWithOnlyD = true;
    }
  });

  if (emptyfields) {
    errors.push('Please fill in all fields.');
  }

  if (fieldsWithOnlyD) {
    errors.push('Please enter a number or "d" followed by a number in all fields.');
  }

  if (errors.length > 0) {
    fieldsValid = false;
    for (var i = 0; i < errors.length; i++) {
      errorsHtml += '<li>' + errors[i] + '</li>';
    }
  }

  $('.advanced-roll .warnings').html(errorsHtml);

  return fieldsValid;
}

/**
 * ==================================================================================================
 * Advanced roll Roll button click event handler
 * ==================================================================================================
 */
$('.adv-roll-btn').on('click', function(){
  var result;
  var startNumber = $('.work-area .start-number').val();

  if (!validateSegmentEntries()) {
    $('.adv-roll-result p').html('/');
    return;
  }

  







  result = numberOrRoll(startNumber);

  // Foreach
  $('.work-area .adv-roll-segment').each(function() {
    var valueToUse = numberOrRoll($(this).find('input').val());
    var operation = $(this).attr('data-operation');

    switch (operation) {
      case 'addition' :
        result += valueToUse;
      break;

      case 'substraction' :
        result -= valueToUse;
      break;

      case 'multiplication' :
        result *= valueToUse;
      break;

      case 'division' :
        result /= valueToUse;
      break;

      default:

      break;
    }
  }); // foreach END

  showResult(result);
});

/**
 * ==================================================================================================
 * Clears the result of Advanced roll
 * ==================================================================================================
 */
function clearAdvRes() {
  $('.container .adv-roll-result p').html('0');
}

/**
 * ==================================================================================================
 * "Remove all segments" button click event handler
 * ==================================================================================================
 */
$('.advanced-roll .remove-all-segments').on('click', function(){
  if(confirm('Remove all segments?')) {
    $('.container .adv-roll-segment').each(function(){
      if(!$(this).hasClass('start-segment')) {
        $(this.remove());
      }
    });
    clearAdvRes();
    $('.advanced-roll .start-segment input').val('');
  }
});

/**
 * ==================================================================================================
 * "Clear fields" button click event handler
 * ==================================================================================================
 */
$('.advanced-roll .clear-fields').on('click', function() {
  if(confirm('Clear all fields?')) {
    $('.container .adv-roll-segment input').each(function() {
      $(this).val('');
    });
  }  
  clearAdvRes();
});

/**
 * ==================================================================================================
 * When "Round up" is selected "Round down" is deselected
 * ==================================================================================================
 */
$('.round-up').on('input', function() {
  $('.round-down').prop('checked', false);
});

/**
 * ==================================================================================================
 * When "Round down" is selected "Round up" is deselected
 * ==================================================================================================
 */
$('.round-down').on('input', function() {
  $('.round-up').prop('checked', false);
});