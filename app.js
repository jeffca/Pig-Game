/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, lastDice;

$(document).ready(function() {
	init();
	$(".btn-roll").on('click', function() {
		//1. Generate a random number
		dice = Math.floor(Math.random() * 6 ) + 1;
		console.log(dice);
		
		//2. Show the number in the current score and the dice image
		var diceDOM=$(".dice");
		diceDOM.css({display:"block"});
		diceDOM.attr("src",'dice-'+dice+'.png');
		console.log(lastDice);
		
		//3. Update the score IF the score if not a 1
		if (dice === 6 && lastDice === 6) {
			scores[activePlayer] = 0;
			$("#score-"+activePlayer).html(0);	
		} else if (dice !== 1) {
			//Add score
			roundScore+=dice;
			$("#current-"+activePlayer).html(roundScore);
			$("#message").hide();
		} else {
			//Move to next player
				
			$("#message").html("You rolled a one! Next player's turn.");
			$("#message").show();
			nextPlayer();
		}
		lastDice = dice;
	});

	$(".btn-hold").on('click', function() {
		//1. Add round score to global score
		scores[activePlayer] += roundScore;

		//2. Update the UI
		$("#score-"+activePlayer).html(scores[activePlayer]);
		//Check if player won the game

		var inputScore = $("#inputScore").val();
		console.log(inputScore);
		if (scores[activePlayer] >= inputScore) {
			$("#name-"+activePlayer).html("WINNER!!!!");
			$(".dice").hide();
			$(".player-"+activePlayer+"-panel").addClass("winner");
			$(".btn-roll").hide();
			$(".btn-hold").hide();
		} else {
			nextPlayer();
		}
	});

	$(".btn-new").on('click', init);
});

function nextPlayer() {
	$(".dice").hide();
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	

	roundScore=0;
	
	$("#current-0").html(0);
	$("#current-1").html(0);

	$(".player-0-panel").toggleClass("active");
	$(".player-1-panel").toggleClass("active");

}

function init() {
	scores=[0,0];
	activePlayer=0;
	roundScore=0;	

	$(".dice").hide();
	
	$("#score-0").html(0);	
	$("#score-1").html(0);
	$("#current-0").html(0);
	$("#current-1").html(0);

	$(".btn-roll").show();
	$(".btn-hold").show();

	$("#name-0").html("Player 1");
	$("#name-1").html("Player 2");


	$(".player-0-panel").removeClass("winner");
	$(".player-1-panel").removeClass("winner");

	$(".player-0-panel").removeClass("active");
	$(".player-1-panel").removeClass("active");

	$(".player-0-panel").addClass("active");

}

//coding challenge 1;
//player loses his entire score when he rolls two sixes in a row; then it is the next player's turn.
