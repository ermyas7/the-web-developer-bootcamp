var player1 = document.querySelector("#p1");
var player2 = document.querySelector("#p2");
var player1Display = document.querySelector("#player1");
var player2Display = document.querySelector("#player2");
var restart = document.querySelector("#reset");
var input = document.querySelector("input[type=number]");
var playingTo = document.querySelector("p span");
var player1Score = 0;
var player2Score = 0;
var maxScore = 5;
var gameOver = false;
player1.addEventListener("click", function(){
	
	if(!gameOver){
		player1Score++;
		if(player1Score === maxScore){
			gameOver = true;
			player1Display.classList.add("winner");
		}
	}
	player1Display.textContent = player1Score;
	
});

player2.addEventListener("click", function(){
	if(!gameOver){
		player2Score++;
		if(player2Score === maxScore){
			player2Display.classList.add("winner");
			gameOver = true;
		}
	}
	player2Display.textContent = player2Score;
	
});
restart.addEventListener("click", function(){
	reset();
});
input.addEventListener("change", function(){
	reset();
	maxScore = Number(this.value);
	playingTo.textContent = maxScore;
});

function reset(){
	player1Score = 0;
	player2Score = 0;
	player1Display.textContent = player1Score;
	player2Display.textContent = player2Score;
	player1Display.classList.remove("winner");
	player2Display.classList.remove("winner");
	gameOver = false;
}
