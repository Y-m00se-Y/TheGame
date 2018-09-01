'use strict';

var playerMove = 0;
var cpuMove = 0;
var winCounter = 0;
var drawCounter = 0;
var lossCounter = 0;
var newGame = false;
var rounds = 0;

var win = document.getElementById('win');
var draw = document.getElementById('draw');
var loss = document.getElementById('loss');
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');
var buttonNewGame = document.getElementById('newGame');
var background1 = document.getElementById('player');
var background2 = document.getElementById('cpu');
var output = document.getElementById('output');
var bestOf = document.getElementById('bestOf')

var cpu = function() {
	return Math.floor((Math.random() * 3) + 1);
}
var result = function() {
	if (playerMove == cpuMove && playerMove != 0) {
		return 'draw';
	}
	else if (playerMove == 0) {
		return 'start';
	}
	else if (playerMove == 1 && cpuMove == 2) {
		return 'won';
	}
	else if (playerMove == 2 && cpuMove == 3) {
		return 'won';
	}
	else if (playerMove == 3 && cpuMove == 1) {
		return 'won';
	}
	else {
		return 'lost';
	}
}
var counters = function(result) {
	if (result() == 'won') {
		winCounter++;
		win.innerHTML = winCounter;
	}
	else if (result() == 'draw') {
		drawCounter++;
		draw.innerHTML = drawCounter;
	}
	else {
		lossCounter++;
		loss.innerHTML = lossCounter;
	}
}
var playerBackground = function(playerMove) {
	if (playerMove == 0) {
		background1.className = "";
		background1.classList.add('start');
		return 'start';
	}
	else if (playerMove == 1) {
		background1.className = "";
		background1.classList.add('paper');
		return 'paper';
	}
	else if (playerMove == 2) {
		background1.className = "";
		background1.classList.add('stone');
		return 'stone';
	}
	else if (playerMove == 3) {
		background1.className = "";
		background1.classList.add('scissors');
		return 'scissors';
	}
}
var cpuBackground = function(cpuMove) {
	if (cpuMove == 0) {
		background2.className = "";
		background2.classList.add('start');
		return 'start';
	}
	else if (cpuMove == 1) {
		background2.className = "";
		background2.classList.add('paper');
		background2.classList.add('flip');
		return 'paper';
	}
	else if (cpuMove == 2) {
		background2.className = "";
		background2.classList.add('stone');
		background2.classList.add('flip');
		return 'stone';
	}
	else if (cpuMove == 3) {
		background2.className = "";
		background2.classList.add('scissors');
		background2.classList.add('flip');
		return 'scissors';
	}
}
var outputLog = function(result) {
	if (result() == 'won') {
		output.insertAdjacentHTML('afterbegin', 'You WON!!!<br>You played: ' + playerBackground(playerMove).toUpperCase() + '<br>CPU played: ' + cpuBackground(cpuMove).toUpperCase() + '<br>');
	}
	else if (result() == 'lost') {
		output.insertAdjacentHTML('afterbegin', 'You LOST!!!<br>You played: ' + playerBackground(playerMove).toUpperCase() + '<br>CPU played: ' + cpuBackground(cpuMove).toUpperCase() + '<br>');
	}
	else if (result() == 'draw') {
		output.insertAdjacentHTML('afterbegin', 'DRAW!!!<br>You played: ' + playerBackground(playerMove).toUpperCase() + '<br>CPU played: ' + cpuBackground(cpuMove).toUpperCase() + '<br>');
	}
	else if (result() == 'start') {
		output.insertAdjacentHTML('afterbegin', 'THE GAME!!!<br><br>Click NEW GAME to play<br>');
	}
}
var entireGame = function() {
	if (newGame == true && winCounter == rounds && winCounter > 0) {
		output.insertAdjacentHTML('afterbegin', 'YOU WON THE GAME!!!<br>Master "moose the wise" WORSHIP YOU<br>Click NEW GAME to play<br>');
		newGame = false;
		/*winCounter = 0;
		drawCounter = 0;
		lossCounter = 0;
		playerBackground(0);
		cpuBackground(0);
		win.innerHTML = winCounter;
		loss.innerHTML = lossCounter;
		draw.innerHTML = drawCounter;*/
	}
	else if (newGame == true && lossCounter == rounds && lossCounter > 0) {
		output.insertAdjacentHTML('afterbegin', 'YOU LOST THE GAME!!!<br>Master "moose the wise" DESPISES YOU<br>Click NEW GAME to play<br>');
		newGame = false;
		/*winCounter = 0;
		drawCounter = 0;
		lossCounter = 0;
		playerBackground(0);
		cpuBackground(0);
		win.innerHTML = winCounter;
		loss.innerHTML = lossCounter;
		draw.innerHTML = drawCounter;*/
	}
}
var conlog = function() {
		console.log('----------------------')
		console.log('New game: ' + newGame);
		console.log('Rouns: ' + rounds);
		console.log('Results: ' + result());
		console.log('Player: '+ playerMove);
		console.log('CPU: '+ cpuMove);
		console.log('Counters: ');
		console.log('draw: ' + drawCounter);
		console.log('loss: ' + lossCounter);
		console.log('win: ' + winCounter);
		console.log('Check newGame = true: ' + (newGame == true));
		console.log('Check winCounter == rounds: ' + (winCounter == rounds));
		console.log('Check lossCounter == rounds: ' + (lossCounter == rounds));
}
buttonNewGame.addEventListener('click', function() {
	rounds = window.prompt('How many rounds to WIN entire "THE GAME!!!"');
	if (isNaN(rounds) == false && rounds != '' && rounds > 0 && rounds != 'null') {
		newGame = true;
		output.insertAdjacentHTML('afterbegin', '"THE GAME!!!" - Best of ' + ((rounds * 2) - 1) + '<br>You have to win ' + rounds + ' rounds to WIN<br>Click your weapon and play<br>');
		bestOf.innerHTML = '<p><small> Best of: ' + ((rounds * 2) - 1) + '</small></p>';
	}
	else {			
		output.insertAdjacentHTML('afterbegin', 'THE GAME!!!<br>INVALID ROUNDS NUMBER!!!<br>Type correct rounds number and click NEW GAME to play<br>');
	}
	winCounter = 0;
	drawCounter = 0;
	lossCounter = 0;
	playerBackground(0);
	cpuBackground(0);
	win.innerHTML = winCounter;
	loss.innerHTML = lossCounter;
	draw.innerHTML = drawCounter;
	conlog();
});
button1.addEventListener('click', function() {
	if (newGame == true && winCounter < rounds && lossCounter < rounds) {
		playerMove = 1;
		cpuMove = cpu();
		counters(result);
		playerBackground(playerMove);
		cpuBackground(cpuMove);
		outputLog(result);
		entireGame();

		conlog();
	}
	conlog();
});
button2.addEventListener('click', function() {
	if (newGame == true && winCounter < rounds && lossCounter < rounds) {
		playerMove = 2;
		cpuMove = cpu();
		counters(result);
		playerBackground(playerMove);
		cpuBackground(cpuMove);
		outputLog(result);
		entireGame();

		conlog();
	}
	conlog();
});
button3.addEventListener('click', function() {
	if (newGame == true && winCounter < rounds && lossCounter < rounds) {
		playerMove = 3;
		cpuMove = cpu();
		counters(result);
		playerBackground(playerMove);
		cpuBackground(cpuMove);
		outputLog(result);
		entireGame();

		conlog();
	}
	conlog();
});;


outputLog(result);

conlog();
