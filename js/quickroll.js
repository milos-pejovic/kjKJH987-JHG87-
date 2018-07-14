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
