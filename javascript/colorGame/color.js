var squares = document.querySelectorAll(".square");
var pickedDisplay = document.querySelector("#picked");
var messageDisplay = document.querySelector("#message");
var headerDisplay = document.querySelector("h1");
var reset = document.querySelector("#reset");
var easyBtn = document.querySelector("#easy");
var normalBtn = document.querySelector("#normal");
var hardBtn = document.querySelector("#hard");

var squareNum = [3, 6, 9];
var index = 1;
var colors = generateRandomColors(squareNum[index]);
var pickedColor = pickColor();
resetColor(6);

squares.forEach(function(square){
	square.addEventListener("click",function(){
	if(square.style.backgroundColor === pickedColor){
		messageDisplay.textContent = "Correct!";
		changeColor(square);
		reset.textContent = "Try Again?";
	}
	else{
		messageDisplay.textContent = "Try Again";
		square.style.backgroundColor = "#232323";
	}
});
});
reset.addEventListener("click", function(){
	resetColor(squareNum[index]);
});

easyBtn.addEventListener("click",function(){
	index = 0;
	easyBtn.classList.add("selected");
	normalBtn.classList.remove("selected");
	hardBtn.classList.remove("selected");
	resetColor(squareNum[index]);
	for(var i = 0; i < squares.length; i++){
		if(!colors[i]){
			squares[i].style.display = "none";
		}
		else{
			squares[i].style.display = "block";
		}
	}
});
normalBtn.addEventListener("click",function(){
	index = 1;
	easyBtn.classList.remove("selected");
	normalBtn.classList.add("selected");
	hardBtn.classList.remove("selected");
	resetColor(squareNum[index]);
	for(var i = 0; i < squares.length; i++){
		if(!colors[i]){
			squares[i].style.display = "none";
		}
		else{
			squares[i].style.display = "block";
		}
	}
});
hardBtn.addEventListener("click",function(){
	index = 2;
	easyBtn.classList.remove("selected");
	normalBtn.classList.remove("selected");
	hardBtn.classList.add("selected");
	resetColor(squareNum[index]);
	for(var i = 0; i < squares.length; i++){
		if(!colors[i]){
			squares[i].style.display = "none";
		}
		else{
			squares[i].style.display = "block";
		}
	}
});
function changeColor(square){
	headerDisplay.style.backgroundColor = square.style.backgroundColor;
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = square.style.backgroundColor;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var arr = [];
	for(var i = 0; i < num; i++){
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var r, g, b;
	r = Math.floor(Math.random() * 256);
	g = Math.floor(Math.random() * 256);
	b = Math.floor(Math.random() * 256);
	return `rgb(${r}, ${g}, ${b})`;
}

function resetColor(num){
	colors = generateRandomColors(num);
	pickedColor = pickColor();
	pickedDisplay.textContent = pickedColor;
	headerDisplay.style.backgroundColor = "steelblue";
	for(var i = 0; i < squares.length; i++){
	squares[i].style.backgroundColor = colors[i];
		if(!colors[i]){
			squares[i].style.display = "none";
		}
		else{
			squares[i].style.display = "block";
		}	
}
}

