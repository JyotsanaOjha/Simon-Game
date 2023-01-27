var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function (event) {
    if (started == false) {
        nextSequence();
        started = true;
    }
})


function nextSequence() {

    //Reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    //generate a random number between 0 and 3
    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 4);

    //use random number as the index to choose the random colour from the array buttonColours
    randomChosenColour = buttonColours[randomNumber];

    //play the particular sound according to randomly selected colour button
    playSound(randomChosenColour)

    //Use jQuery to select the button with the same id as the randomChosenColour, and animate a flash to the button selected.
    $("#" + randomChosenColour).fadeOut(300).fadeIn(300);

    gamePattern.push(randomChosenColour);

    console.log(gamePattern);

}


// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");

    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);

    //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
});


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour) {
    //Use jQuery to add this pressed class to the button that gets clicked
    $("#" + currentColour).addClass("pressed");

    //use Javascript to remove the pressed class after a 100 milliseconds
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}



function checkAnswer(currentLevel) {

    //to check if the most recent user answer is the same as the game pattern.
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (currentLevel < gamePattern.length - 1) {
            console.log("success and go for next click")

        } else if (currentLevel == gamePattern.length - 1) {//If the user got the most recent answer right in the previous step, then check that they have finished their sequence.
            console.log("success and go to next level");
            setTimeout(nextSequence, 1000);
            //nextSequence();
        }
    } else {
        console.log("wrong and game over");
        playSound("wrong");

        //game over animation
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);


        $("#level-title").text("Game Over, Press A Key to Retart");

        //Call startOver() if the user gets the sequence wrong.
        startOver();

    }
}


function startOver() {
    //Reset everything to initial values.
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
}















