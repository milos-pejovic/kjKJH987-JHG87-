var existingDiceSizes = [2, 3, 4, 6, 8, 10, 12, 20, 30, 100];
var currentQuickRollType = 'single-dice';

addSingleDiceEventHandlers();
setAccordionHeight();

/**
 * ==================================================================================================
 * Add event handlers to all dice (including custom dice)
 * ==================================================================================================
 */
function addEventHandlersToAllDice() {
    if (currentQuickRollType == 'single-dice') {
        addSingleDiceEventHandlers();
    } else if (currentQuickRollType == 'opposed-roll') {
        addOpposedRollEventHandlers();
    } else if (currentQuickRollType == 'dice-pool') {
        addDicePollEventHandlers();
    }
}

/**
 * ==================================================================================================
 * Quick roll type of roll buttons click event handler
 * ==================================================================================================
 */
$('.quick-roll-types button').on('click', function() {
    $('.quick-roll-results > div').hide();
    $('.quick-roll-results > div[data-roll-type="'+$(this).attr('data-roll-type')+'"]').show();
});

/**
 * ==================================================================================================
 * Adds Dice button functionality for Single Dice
 * ==================================================================================================
 */
function addSingleDiceEventHandlers() {
    $('.dice-buttons button, .custom-dice-buttons button').unbind('click');
    $('.dice-buttons button, .custom-dice-buttons button').unbind('contextmenu');
    $('.dice-buttons button, .custom-dice-buttons button').on('click', function() {
        var diceSize = $(this).attr('data-diceSize');
        var result = roll(parseInt(diceSize));
        $('.result').html(result);
    });
    currentQuickRollType = 'single-dice';
}

/**
 * ==================================================================================================
 * Adds Dice button functionality for Opposed Roll
 * ==================================================================================================
 */
function addOpposedRollEventHandlers() {
    $('.dice-buttons button, .custom-dice-buttons button').unbind('click');
    $('.dice-buttons button, .custom-dice-buttons button').unbind('contextmenu');
    $('.dice-buttons button, .custom-dice-buttons button').on('click', function() {
        var diceSize = $(this).attr('data-dicesize');
        var element = '<button data-dicesize="'+diceSize+'">d'+diceSize+'</button>';
        $('.left-dice-wrapper .left-dice').html(element);
        rollOpposedDice();
    });

    $('.dice-buttons button, .custom-dice-buttons button').on('contextmenu', function(e) {
        e.preventDefault();
        var diceSize = $(this).attr('data-dicesize');
        var element = '<button data-dicesize="'+diceSize+'">d'+diceSize+'</button>';
        $('.right-dice-wrapper .right-dice').html(element);
        rollOpposedDice();
    });

    currentQuickRollType = 'opposed-roll';
}

/**
 * ==================================================================================================
 * Adds Dice button functionality for DicePool
 * ==================================================================================================
 */
function addDicePollEventHandlers() {
    $('.dice-buttons button, .custom-dice-buttons button').unbind('click');
    $('.dice-buttons button, .custom-dice-buttons button').unbind('contextmenu');

    $('.dice-buttons button, .custom-dice-buttons button').on('click', function() {
        var diceSize = $(this).attr('data-dicesize');
        var newElement = '<button data-dicesize="'+diceSize+'">d'+diceSize+'</button>';
        $('.dice-pool-work-area .chosen-dice').html(newElement);
    });
    currentQuickRollType = 'dice-pool';
}

/**
 * ==================================================================================================
 * "Single dice" click event handler
 * ==================================================================================================
 */
$('.quick-roll-types .single-dice').on('click', function() {
    $('.opposed-roll-instructions').hide();
    $('.dice-pool-instructions').hide();
    $('.dice-pool-work-area').hide();
    addSingleDiceEventHandlers();
});

/**
 * ==================================================================================================
 * "Opposed roll" click event handler
 * ==================================================================================================
 */
$('.quick-roll-types .opposed-roll').on('click', function() {
    $('.opposed-roll-instructions').show();
    $('.dice-pool-work-area').hide();
    $('.dice-pool-instructions').hide();
    addOpposedRollEventHandlers();
});

/**
 * ==================================================================================================
 * "Dice pool" click event handler
 * ==================================================================================================
 */
$('.quick-roll-types .dice-pool').on('click', function() {
    $('.opposed-roll-instructions').hide();
    $('.dice-pool-work-area').hide();
    $('.dice-pool-instructions').show();
    addDicePollEventHandlers();
});

/**
 * ==================================================================================================
 * "Dice pool" click event handler
 * ==================================================================================================
 */
$('.quick-roll-types .dice-pool').on('click', function() {
    $('.opposed-roll-instructions').hide();
    $('.dice-pool-work-area').show();

});

/**
 * ==================================================================================================
 * Make custom dice
 * ==================================================================================================
 */
$('.make-custom-dice').on('click', function(){
    var diceSidesNumber = prompt('How many sides should the dice have?');

    // Check if an integer is entered
    if (!$.isNumeric(diceSidesNumber)) {
        alert('Plese enter a whole number');
        return;
    }

    // Check if dice already exists
    if (existingDiceSizes.indexOf(parseInt(diceSidesNumber)) != -1){
        if (!confirm('Dice already exists.\nCreate anyway?')) {
            return;
        }
    }
    
    existingDiceSizes.push(parseInt(diceSidesNumber));

    var newDiceElement = $('.elements-repository .quick-roll-button-repo').html();

    // Create new dice
    newDiceElement = newDiceElement.replace(/diceSizeNumber/g, diceSidesNumber);
    $('.custom-dice-buttons').append(newDiceElement);
    $('.custom-dice-buttons [class="custom-dice-' + diceSidesNumber + '"]').on('click', function() {
        $('.result').html(roll(diceSidesNumber));
    });

    addEventHandlersToAllDice();
});

/**
 * ==================================================================================================
 * Roll selected opposed dice
 * ==================================================================================================
 */
function rollOpposedDice() {
    var leftDiceSize = $('.left-dice button').attr('data-dicesize');
    var rightDiceSize = $('.right-dice button').attr('data-dicesize');
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
$('.opposed-roll-results').delegate('.left-dice button, .right-dice button', 'click', function() {
    rollOpposedDice();
})

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

    if (successTreshold !== '') {
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
