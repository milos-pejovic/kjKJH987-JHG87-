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
    $('.dice-buttons div, .custom-dice-buttons div').unbind('click');
    $('.dice-buttons div, .custom-dice-buttons div').unbind('contextmenu');
    $('.dice-buttons div, .custom-dice-buttons div').on('click', function() {
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
    $('.dice-buttons div, .custom-dice-buttons div').unbind('click');
    $('.dice-buttons div, .custom-dice-buttons div').unbind('contextmenu');

    $('.dice-buttons div, .custom-dice-buttons div').on('click', function() {
        var diceSize = $(this).attr('data-dicesize');
        renderClickedOpposedDice(diceSize, 'left');

        rollOpposedDice();
    });

    $('.dice-buttons div, .custom-dice-buttons div').on('contextmenu', function(e) {
        e.preventDefault();
        var diceSize = $(this).attr('data-dicesize');
        renderClickedOpposedDice(diceSize, 'right');

        rollOpposedDice();
    });

    currentQuickRollType = 'opposed-roll';
}

/**
 * ==================================================================================================
 * renderClickedOpposedDice
 * ==================================================================================================
 * Chanegs the left or right dice in "Opposed roll". 
 * @param {int} diceSize 
 * @param {string} side - Left dice or right dice
 */
function renderClickedOpposedDice(diceSize, side) {

    if (side !== 'left' && side !== 'right') {
        console.error("Parameter 'side' must be a string 'left' or 'right'.");
        return;
    }

    var element = '';

    if (isDiceSizeCustom(diceSize)) {
        element = '<div data-diceSize="' + diceSize + '" class="dice custom-dice-custom-number custom-dice" data-diceSize="' + diceSize + '">';
    } else {
        element = '<div data-diceSize="' + diceSize + '" class="dice custom-dice-' + diceSize + ' custom-dice" data-diceSize="' + diceSize + '">';
    }

    element += '<img src="images/single-dice/d' + diceImageNameNumber(diceSize) + '.gif" />';
    element += '<p>d' + diceSize + '</p>';
    element += '</div>';

    $('.' + side + '-dice-wrapper .' + side + '-dice').html(element);
}

/**
 * ==================================================================================================
 * Adds Dice button functionality for DicePool
 * ==================================================================================================
 */
function addDicePollEventHandlers() {
    $('.dice-buttons div, .custom-dice-buttons div').unbind('click');
    $('.dice-buttons div, .custom-dice-buttons div').unbind('contextmenu');

    $('.dice-buttons div, .custom-dice-buttons div').on('click', function() {
        var diceSize = $(this).attr('data-dicesize');
        var element = '';

        if (isDiceSizeCustom(diceSize)) {
            element = '<div data-diceSize="' + diceSize + '" class="dice d100" data-diceSize="' + diceSize + '">';
        } else {
            element = '<div data-diceSize="' + diceSize + '" class="dice d' + diceSize + '" data-diceSize="' + diceSize + '">';
        }
    
        element += '<img src="images/single-dice/d' + diceImageNameNumber(diceSize) + '.gif" />';
        element += '<p>d' + diceSize + '</p>';
        element += '</div>';

        $('.dice-pool-work-area .chosen-dice').html(element);
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
    $('.single-dice-instructions').show();
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
    $('.single-dice-instructions').hide();
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
    $('.single-dice-instructions').hide();
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
 * Quick roll types button style
 * ==================================================================================================
 * On click of a quick roll type style the clicked button, and remove that style from the rest of the buttons.
 */
$('.quick-roll .quick-roll-types button').on('click', function() {
    $('.quick-roll .quick-roll-types button').removeClass('active-quick-roll-type');
    $(this).addClass('active-quick-roll-type');
});


/**
 * ==================================================================================================
 * diceImageNameNumber
 * ==================================================================================================
 * @param {*} diceSize 
 */
function diceImageNameNumber(diceSize) {
    var diceImageNameNumber = '';

    if (originalDiceSizes.indexOf(parseInt(diceSize)) !== -1){
        if (diceSize == '3') {
            diceSize = '6';
        }
        diceImageNameNumber = diceSize;
    } else {
        diceImageNameNumber = '100';
    }

    return diceImageNameNumber;
}

/**
 * ==================================================================================================
 * isDiceSizeCustom
 * ==================================================================================================
 * @param {*} diceSize 
 */
function isDiceSizeCustom(diceSize) {
    if (originalDiceSizes.indexOf(parseInt(diceSize)) == -1) {
        return true;
    } else {
        return false;
    }
}
