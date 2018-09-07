var squares = document.querySelectorAll(".square");
var pickedDisplay = document.querySelector("#picked");
var messageDisplay = document.querySelector("#message");
var headerDisplay = document.querySelector("h1");
var colors =[
	"rgb(255, 0, 0)",
	"rgb(0, 255, 0)",
	"rgb(0, 0, 255)",
	"rgb(255, 255, 0)",
	"rgb(255, 0, 255)",
	"rgb(0, 255, 255)",
	"rgb(127, 0, 0)",
	"rgb(0, 127, 0)",
	"rgb(0, 0, 127)"
];

var pickedColor = pickColor();
for(var i = 0; i < squares.length; i++){
	squares[i].style.backgroundColor = colors[i];
}

pickedDisplay.textContent = pickedColor;

squares.forEach(function(square){
	square.addEventListener("click",function(){
	if(square.style.backgroundColor === pickedColor){
		messageDisplay.textContent = "Correct!";
		changeColor(square);
	}
	else{
		messageDisplay.textContent = "Try Again";
		square.style.backgroundColor = "#232323";
	}
});
});

function changeColor(square){
	headerDisplay.style.backgroundColor = square.style.backgroundColor;
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = square.style.backgroundColor;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * squares.length);
	return colors[random];
}