/* 
  
    Odin Project Rock Paper Scissors Game
    Played versus an AI

*/


// KEEPS TRACK OF THE GAME
const GAME_ROUNDS = 5;
let roundsPlayed = 0;
let playerScore = 0;
let computerScore = 0;

// Random number generator
function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

function displayComputerPlay(choice){
    const choiceElm = document.getElementById('computer-choice');
    let iconChoice = '';

    if (choice === 'rock'){
        iconChoice = "dangerous";
    } else if (choice === 'paper'){
        iconChoice = "description";
    } else { // scissors
        iconChoice = "content_cut";
    }

    choiceElm.innerHTML = iconChoice;
}

function computerPlay(){
    // stores a number between 1 and 3 inside of a variable
    let computerChoice = getRandomInt(1, 4);

    // compare that variable to the different options it could be, and return a move the CPU will make
    switch(computerChoice){
        case 1:
            displayComputerPlay('rock');
            return 'rock';
            break;
        case 2:
            displayComputerPlay('paper');
            return 'paper';
            break;
        case 3: 
            displayComputerPlay('scissors');
            return 'scissors';
            break;
        default: 
            console.log('Invalid choice!');
    }
}

function playTurn(player, computer){
    // maps out what each choice is weak to
    const moves = [
        {
            choice: 'rock',
            weakness: 'paper',
        },
        {
            choice: 'paper',
            weakness: 'scissors',
        },
        {
            choice: 'scissors',
            weakness: 'rock',
        },
    ];

    if (player == computer){
        // if the player and computer chose the same thing, it's a draw
        return {score: 0,
        message: `It's a draw!  You both chose ${player}!`};
    }

    // Otherwise, loop through the different combinations
    for (i = 0; i < moves.length; i++){
        if (player == moves[i].choice){
            // The player is currently sync'd with [i]
            if (computer == moves[i].weakness){
                // The computer picked what the player is weak to
                return {score: -1,
                    message: `You lose!  The computer chose ${moves[i].weakness}, which beats ${moves[i].choice}!`};
            } else {
                // Only other option is that the player won
                return {score: 1,
                    message: `You win! You chose ${moves[i].choice}, which beats ${computer}!`};
            }
        }
    }
}

function updateScore(){
    const player = document.getElementById('player-score');
    const computer = document.getElementById('computer-score');
    const rounds = document.getElementById('rounds-played');

    player.innerHTML = playerScore;
    computer.innerHTML = computerScore;
    rounds.innerHTML = roundsPlayed;
}

function endGame(){
    const infoElm = document.getElementById('info-elm');
    let message = ``;

    if (playerScore > computerScore){
        message = `Congratulations!  You beat the computer ${playerScore} out of ${roundsPlayed} rounds!!`;
    } else if (computerScore > playerScore){
        message = `Oh, no! The computer beat you ${computerScore} out of ${roundsPlayed} rounds!!`;
    } else {
        message = `Wow! Both the computer and you scored ${computerScore}!! It's a tie!!!`;
    }

    infoElm.innerHTML = message;
}

function resetGame(){
    const DEFAULT_MESSAGE = "Can you beat the computer in a best of 5 rounds?";
    // reset everything
    let confirmReset = confirm('New game?');
    if (confirmReset === true){
        document.getElementById('info-elm').innerHTML = DEFAULT_MESSAGE; // resets the flavor text
        document.getElementById('computer-choice').innerHTML = `help_outline`; // (?) for cpu's choice
        
        // reset all the scores
        roundsPlayed = 0;
        playerScore = 0;
        computerScore = 0;
        updateScore();  

        // makes all the colors black
        colorResult()
    }
}

function colorResult(color = "black", choice = "none"){
    const computerColor =  document.getElementById('computer-choice');
    const moves = [
        'rock',
        'paper',
        'scissors'
    ];

    // make them all black
    for (i = 0; i < moves.length; i ++){
        document.getElementById(moves[i]).style.color = "black";
        computerColor.style.color = "black";
    }

    // color the selection based on result
    if (choice != "none"){
        document.getElementById(choice).style.color = color;

        if (color === "red"){
            computerColor.style.color = "green";
        } else if (color === "green"){
            computerColor.style.color = "red";
        } else if (color === "blue"){
            computerColor.style.color = "blue";
        }
    } 
}


function game(choice){   
    if (roundsPlayed < GAME_ROUNDS){
        // store the result in a variable
        let gameResult = playTurn(choice, computerPlay());

        // add to the score & color the player's piece red (lost), green (won), or blue (tied)
        if (gameResult.score === -1){
            computerScore ++;
            colorResult('red', choice);
        } else if (gameResult.score === 1){
            playerScore ++;
            colorResult('green', choice);
        } else {
            colorResult('blue', choice);
        }

        // add to the rounds played
        roundsPlayed ++;

        // updates everything
        updateScore();

        if (roundsPlayed === GAME_ROUNDS){
            endGame();
        }

    } else {
        // end the game
        resetGame();
    }
}


// allows the game to be played with just a keyboard
document.getElementById('rock').addEventListener("keyup", function(e){
    if (e.keyCode == 13){
        game("rock");
    }
});

document.getElementById('paper').addEventListener("keyup", function(e){
    if (e.keyCode == 13){
        game("paper");
    }
});

document.getElementById('scissors').addEventListener("keyup", function(e){
    if (e.keyCode == 13){
        game("scissors");
    }
});