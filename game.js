var buttonColours = ["red", "blue", "green", "yellow"]; // colors of button so they can be assigned a number for sequence
var gamePattern = []; // sequence of numbers (numbers = colors from prev step)

var userClickedPattern = []; // sequence of colors clicked by user

var started = false;

var level = 0;

$(document).keydown(function() {
    if(!started) {

        $("#level-title").text("Level " + level);
        newSequence();
        started = true;
    }
});

function newSequence() { // function generates a random new sequence every time
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); // generates a number from 0 to 3
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); // add the color to the seq.

    $("#" + randomChosenColour).fadeIn(80).fadeOut(80).fadeIn(80);

    playSound(randomChosenColour); // plays sound when seq is being told to the user
}

$(".btn").click(function() { // when any button is clicked
    var userChosenColour = $(this).attr("id"); // give id for the clicked button
    userClickedPattern.push(userChosenColour); // add the color to user patter seq.

    playSound(userChosenColour); // play sound of button clicked by user
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) { // play sound respective to the color
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                newSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");

        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}