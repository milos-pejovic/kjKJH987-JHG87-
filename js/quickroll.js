var existingDiceSizes = [2, 3, 4, 6, 8, 10, 12, 20, 30, 100];

/**
 * Dice buttons click event handler
 */
$('.dice-buttons button').on('click', function() {
    var diceSize = $(this).attr('data-diceSize');
    var result = roll(parseInt(diceSize));
    $('.result').html(result);
});

/**
 * Make custom dice
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
});