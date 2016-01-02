/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//array stores all the cards
var cards_array = ['A', 'A', '2', '2', '3', '3', '4', '4', '5', '5', '6',
    '6', '7', '7', '8', '8', '9', '9', 'J', 'J', 'Q', 'Q', 'K', 'K'];
var cards_values = []; //holds value of card
var index = []; //holds index of card
var cards_flipped = 0; //counts number of cards flipped
var attempt = 0; //counts number of attempt
var correct = 0; //counts number of correct attempt
var ticker, sec, min;
//Create an array prototype of shuffling cards
Array.prototype.cards_shuffle = function () {
    var i = this.length - 1;
    var j, temp;

    //swap index of cards using random number generator
    for (i; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};

//function for setting up new board
function init() {
    cards_flipped = 0;
    var output = '';
    ticker = 60;
    min = 0;
    sec = 0;
    cards_array.cards_shuffle(); //call memeory_tile_shuffle() 
    for (var i = 0; i < cards_array.length; i++) {

        //set ouput as its tile number and call memeoryFlipTile(tile, val) function
        output += '<div id="tile_' + i + '" onclick="cardsFlip(this,\'' + cards_array[i] + '\')"></div>';
    }
    
    //Get the element id of 'memory_board' and set its innerHTML to ouput
    document.getElementById('memory_board').innerHTML = output;
    runclk();
}

//Function for flip the card
function cardsFlip(tile, val) {
    if (tile.innerHTML == "" && cards_values.length < 2) {
        tile.style.background = '#FFF'; //set tile's background to white
        tile.innerHTML = val; //write tile's value using innerHTML

        if (cards_values.length == 0) { //Execute for first flip
            cards_values.push(val); //store memory_value[0] = val
            index.push(tile.id); //store memory_tile_ids[0] = tile.id
        } else if (cards_values.length == 1) { //Execute for second flip
            cards_values.push(val); //store memory_value[1] = val
            index.push(tile.id); //store memory_tile_ids[1] = tile.id
            if (cards_values[0] == cards_values[1]) { //Card matched
                cards_flipped += 2; // increment number of cards flipped by 2
                correct++; //increment number of card match by 1
                attempt++; //increment number of attempt by 1
                // Clear both arrays
                cards_values = [];
                index = [];
                // Check to see if the whole board is cleared
                if (cards_flipped == cards_array.length) {
                    var percentage = (correct / attempt) * 100;
                    alert("Correct: " + correct + "\nAttempt: " + attempt +
                            "\nPercentage: " + percentage.toFixed(2) + "%\n"
                            + "Time Left: " + clockOutput + "\nClick OK to play new Game");
                    document.getElementById('memory_board').innerHTML = "";
                    init();
                }
            } else {
                attempt++;
                function cardFlipBack() {
                    // Flip the 2 tiles back over
                    var card_1 = document.getElementById(index[0]);
                    var card_2 = document.getElementById(index[1]);
                    card_1.style.background = 'url(../images/tile_bg.png) no-repeat';
                    card_1.innerHTML = "";
                    card_1.style.backgroundSize = '100%';
                    card_2.style.background = 'url(../images/tile_bg.png) no-repeat';
                    card_2.innerHTML = "";
                    card_2.style.backgroundSize = '100%';
                    // Clear both arrays
                    cards_values = [];
                    index = [];
                }
                setTimeout(cardFlipBack, 700);
            }
        }
    }
}

function runclk() {
    min = Math.floor(ticker / 60);
    sec = (ticker - (min * 60)) + '';
    if (sec.length == 1) {
        sec = "0" + sec;
    }
    ticker--;
    clockOutput = min + ":" + sec;
    id = setTimeout('runclk()', 1000);
    document.getElementById('clock').innerHTML = clockOutput;
    if(min == 0 && sec == 0){
        alert("Gamer Over\nClick OK to play new Game");
        init();
    }

}