//document.addEventListener('DOMContentLoaded', function () {
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const userChoiceDisplay = document.getElementById('user-choice');
    const resultDisplay = document.getElementById('result');
    const possibleChoices = document.querySelectorAll('button');

    const choices = ['rock', 'paper', 'scissors'];
    const resultColors = {
        draw: '#0dcaf0',
        win: '#39e600',
        lose: '#e60000'
    };

    let userChoice;
    let computerChoice;
    let result;

    possibleChoices.forEach(choice => choice.addEventListener('click', (event) => {
        userChoice = event.target.id;
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
//});
