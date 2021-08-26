/* 
  
    Odin Project Rock Paper Scissors Game
    Played versus an AI

*/


// KEEPS TRACK OF THE GAME
const GAME_ROUNDS = 5;
let roundsPlayed = 0;
let score = 0;

// Random number generator
function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

function computerPlay(){
    // stores a number between 1 and 3 inside of a variable
    let computerChoice = getRandomInt(1, 4);

    // compare that variable to the different options it could be, and return a move the CPU will make
    switch(computerChoice){
        case 1:
            return 'rock';
            break;
        case 2:
            return 'paper';
            break;
        case 3: 
            return 'scissors';
            break;
        default: 
            console.log('Invalid choice!');
    }
}

function playTurn(playerSelection, computerSelection){
    // take the player and computer's choices and store them as lowercase
    let player = playerSelection;
    let computer = computerSelection;

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


function checkPlayerChoice(choice){
    if (choice == null){
        // keep asking until we get an answer
        promptPlayer();
    } else if (choice == 'rock' || choice == 'paper' || choice == 'scissors'){
        return true
    } else {
        alert('That is not a valid choice!');
        promptPlayer();
    }
}

function game(){
    while (roundsPlayed < GAME_ROUNDS){
        // loop through the game for each round we wish to play and prompts the player for a move
        let choice = prompt('Rock, paper, or scissors?'); 
            
        if (checkPlayerChoice(choice) == true){
            // store the result in a variable
            let gameResult = playTurn(choice, computerPlay());
            
            // add or subtract from the score, and display a result message
            score += gameResult.score;

            // add to the rounds played
            roundsPlayed ++;

            console.log(gameResult.message);
        }
    }
    
    // at the end of the game, display a final score
    if (score >= 1){
        console.log(`Congratulations, you beat the computer!`)
    } else if (score < 0){
        console.log(`Too bad! You lost to the computer!`)
    } else {
        console.log(`It's a complete draw!`)
    }
}

game();