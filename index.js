const buttons = $(".game_console-button");
const screenText = $(".game_console-screen-text");

var gamePattern = [];
var userPattern = [];
var gameStarted = false;

function flashButton(color){
    $(`.${color}`).toggleClass(`flash-${color}`);

    setTimeout(function() {
        $(`.${color}`).toggleClass(`flash-${color}`)
    }, 500);
}

function pressButton(color){
    $(`.${color}`).toggleClass(`pressed`);

    setTimeout(function() {
        $(`.${color}`).toggleClass(`pressed`)
    }, 500);
}

function playSound(color){
    var a = new Audio(`./Assets/Sounds/${color}.mp3`);
    a.play();
}

function addGamePattern(){
    var a = Math.floor(Math.random()*buttons.length);
    var color = buttons[a].id;

    gamePattern.push(color);

    console.log(gamePattern);

    flashButton(color);
    playSound(color);

    var level = gamePattern.length;
    $(screenText).text(`Level: ${level}`);
};

$(buttons).click( (e) => {
    if (!gameStarted) {
        return
    } else {    
        var color = e.target.id;
        userPattern.push(color);
        console.log(userPattern);
    }

    playSound(color);
    flashButton(color);
    pressButton(color);

    for (i=0; i < userPattern.length; i++) {
        if (userPattern[i] === gamePattern[i]) {
            if (userPattern.length === gamePattern.length) {
                setTimeout(addGamePattern, 1000);
                userPattern = [];
            }
        } else {
            gameOver();
        }
    }
});

function gameOver(){
    gameStarted = false;
    gamePattern = [];
    userPattern= [];

    $(screenText).text("GAME OVER");
    setTimeout(() => {
        $(screenText).text("Press Enter To Play")
    }, 3000);

    var a = new Audio("./Assets/Sounds/wrong.mp3");
    a.play();
};

$(document).keypress((e) => {
    if (e.key === "Enter" && !gameStarted) {
        addGamePattern();
        gameStarted = true;
    } else {
        return;
    }
});

setInterval(() => {
    if ($(screenText).text() == "Press Enter To Play") {
        $(screenText).fadeOut(1000);
        $(screenText).fadeIn(1000);
    }
}, 2000);