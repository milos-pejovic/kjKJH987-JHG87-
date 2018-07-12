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
 * 
 */
function x() {
    var diceSize = parseInt($('.dice-pool-work-area .chosen-dice button').attr('data-dicesize'));
    var critticalHitTreshold = parseInt($('#crittical-hit-treshold').val());
    var successTreshold = parseInt($('#success-treshold').val());
    var critticalMissTreshold = parseInt($('#crittical-miss-treshold').val());

    var errors = [];

    if (critticalHitTreshold > diceSize) {
        errors.push('Crittical hit treshold must be equal to or lower than dice size.');
    }

    if (critticalHitTreshold < successTreshold) {
        errors.push('Crittical hit treshold must be equal to or higher than success treshold.');
    }

    if (successTreshold > diceSize) {
        errors.push('Success treshold must be equal to or lower than dice size.');
    }

    if (critticalMissTreshold >= diceSize || critticalMissTreshold >= critticalHitTreshold) {
        errors.push('Crittical miss treshold must be lower than success and crittical hit tresholds');
    }

    if (errors.length > 0) {
        for (var i = 0; i < errors.length; i++) {
            console.log(errors[i]);
        }
    }

}

x();