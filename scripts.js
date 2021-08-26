/* 
  
    Odin Project Rock Paper Scissors Game
    Played versus an AI

*/

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
    let player = playerSelection.toLowerCase();
    let computer = computerSelection.toLowerCase();

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
    console.group('Swings...');
    console.log(`You chose ${player}!`);
    console.log(`The computer chose ${computer}!`);

    if (player == computer){
        // if the player and computer chose the same thing, it's a draw
        return {score: 0,
        message: `It's a draw!  You both chose ${moves[i].choice}!`};
    }

    // Otherwise, loop through the different combinations
    for (i = 0; i < moves.length; i++){
        console.log(i)
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

function checkChoice(choice){
    let playerChoice = choice.toLowerCase;

    if (playerChoice == 'rock' || playerChoice == 'paper' || playerChoice == 'scissors'){
        return true;
    } else {
        return false;
    }
}

function game(){
    const GAME_ROUNDS = 5;
    let score = 0;

    for (i = 0; i <= GAME_ROUNDS; i++){
        // loop through the game for each round we wish to play

        // prompt the user for a valid move choice
        let choice = prompt('Rock, paper, or scissors?');
        while (checkChoice(choice) == true){
            choice = prompt('Rock, paper, or scissors?');
        }
        
        // store the result in a variable
        let gameResult = playTurn(choice, computerPlay());
        
        // add or subtract from the score, and display a result message
        score += gameResult.score;
        console.log(gameResult.message);
    }

    // at the end of the game, display a final score
    if (score >= 1){
        console.log(`Congratulations, you won ${score} out of ${GAME_ROUNDS}!`)
    } else if (score < 0){
        console.log(`Too bad! You lost ${score} out of ${GAME_ROUNDS}!`)
    } else {
        console.log(`It's a complete draw!`)
    }
}

game();