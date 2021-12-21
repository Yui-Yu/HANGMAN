"use strict";
function changePic() {
    document.getElementById("hangman").src = hangmanPic[usedChance]; //put the corresponding pics when the player guess it wrong
}

function reset() {
    usedChance = 0;
    document.getElementById("wrongLetters").innerHTML = null;
    answer = wordlist[Math.floor(Math.random() * wordlist.length)].split("");
    answerWord = [];
    for (var m = 0; m < answer.length; m++){
        answerWord[m] = "_";
    }
    document.getElementById("wordSpace").innerHTML = answerWord.join(" ");
    document.getElementById("hangman").src = "images/0.jpg" ;
    document.getElementById("keyboard").innerHTML = null;
    getKeyboard();
} //reset everything when the player press the restart button

function getKeyboard() {
    var boardArray = [["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"],
                      ["n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]];
    for (var x in boardArray) { // for each row
        var row = document.createElement("tr");
        for (var y in boardArray[x]) {// for each cell of row
            var cell = document.createElement("button");
            $(cell).text(boardArray[x][y]);
            $(cell).appendTo($(row));
            $(cell).addClass("letter");
        }
        $(row).appendTo($("#keyboard"));
    } //creat a table and button for the keyboard
    $(".letter").click(function () {
        var guess = $(this).text(); //add the click event for the buttons define guess with jQuery
        if (answer.indexOf(guess) >= 0) {
            for (var k = 0; k < answer.length; k++) {
                if (guess === answer[k]) {
                    answerWord[k] = guess;
                    document.getElementById("wordSpace").innerHTML = answerWord.join(" ");
                }
            } //if the guess is right, replace the _ inside the answerWord array at the position with the letter
            if (answerWord.join("") === answer.join("")) {
                document.getElementById("keyboard").innerHTML = "You win! The name is "+ answer.join("")+".";
            } // when the answerWord array is the same with the answer, display you win
        }
        else if (answer.indexOf(guess) < 0) {
            changePic();
            document.getElementById("wrongLetters").innerHTML += " " + guess;
            $(this).off('click');
            $(this).css('color', 'white');
            usedChance++;
            if (usedChance > 5) {
                document.getElementById("keyboard").innerHTML = "You lost! Please try again! The name is "+ answer.join("")+".";
            } // if the guess is not inside the answer, put it into the wrongAnswers div and when the player use up their chance, display you lose! and show the player the right answer.
        }
    })
}


var wordlist = ["harry", "hermione", "ron", "sirius", "cho", "ginny", "dumbledore"]; // define the wordlist array
var answer = wordlist[Math.floor(Math.random() * wordlist.length)].split(""); // choose a random word from the list
var answerWord = [];
for (var i = 0; i < answer.length; i++){
    answerWord[i] = "_";
} //show the players placeholder so that they'll know how many letters they are gonna guess
document.getElementById("wordSpace").innerHTML = answerWord.join(" ");
var hangmanPic = ["images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg", "images/5.jpg", "images/6.jpg"]; //define an images array so that we can get images from it when we need to change images when the player guesses wrong
var usedChance = 0; //record how many times the player guessed the letter wrong, they totally have 6 chances