const ticTacToeEndpoint = 'http://127.0.0.1:8000/ticTacToe/';

document.addEventListener('DOMContentLoaded', function () {
	//const { cyan } = require("colorette");
    const computerChoiceDisplay = document.getElementById('computer-choice');
	if (!computerChoiceDisplay) {
		console.log('computerChoiceDisplay does not exists');
	}
    const userChoiceDisplay = document.getElementById('user-choice');
	if (!userChoiceDisplay) {
		console.log('computerChoiceDisplay does not exists');
	}
    const resultDisplay = document.getElementById('result');
	if (!resultDisplay) {
		console.log('resultDisplay does not exists');
	}
    const possibleChoices = document.querySelectorAll('.rock-game');
	if (!possibleChoices) {
		console.log('possibleChoices does not exists');
	}

    const choices = ['rock', 'paper', 'scissors'];
    const resultColors = {
        draw: '#0dcaf0',
        win: '#39e600',
        lose: '#e60000'
    };

    let userChoice;
    let computerChoice;
    let result;
	console.log(userChoice);

    possibleChoices.forEach(choice => choice.addEventListener('click', (event) => {
        userChoice = event.target.id;
		console.log('button clicked');
        userChoiceDisplay.innerHTML = userChoice;
        generateComputerChoice();
        determineResult();
        displayResult();
    }));

    function generateComputerChoice() {
        const randomIndex = Math.floor(Math.random() * choices.length);
        computerChoice = choices[randomIndex];
        computerChoiceDisplay.innerHTML = computerChoice;
    }

    function determineResult() {
        if (computerChoice === userChoice) {
            result = 'draw';
        } else if (
            (computerChoice === 'rock' && userChoice === 'paper') ||
            (computerChoice === 'paper' && userChoice === 'scissors') ||
            (computerChoice === 'scissors' && userChoice === 'rock')
        ) {
            result = 'win';
        } else {
            result = 'lose';
        }
    }

    function displayResult() {
        let resultMessage;
        switch (result) {
            case 'draw':
                resultMessage = "It's a Draw!💙";
                break;
            case 'win':
                resultMessage = 'You win!🥳';
                break;
            case 'lose':
                resultMessage = 'You lost!😓';
                break;
        }
        resultDisplay.innerHTML = resultMessage;
        resultDisplay.style.color = resultColors[result];
    }
});
