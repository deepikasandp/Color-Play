var squares = document.querySelectorAll(".square");
var esyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var resetBtn = document.querySelector("#resetbtn");
var mode = document.querySelectorAll(".mode");
var messageDisplay = document.querySelector("#message");
var colorDisplay = document.querySelector("#colorDisplay");
var h1 = document.querySelector("h1");
var scoreMsg = document.querySelector("#scoreMsg");
var numSquares = 6;
var nHardSq = 6;
var nEaySq = 3;
var pickedColor;
var modeStatus = 1; //0 - Easy, 1 = Hard
var colors = generateRandomColors(numSquares);
var score = 0;

resetBtn.addEventListener("click", ()=>reset(resetBtn),false);
esyBtn.addEventListener("click", ()=>easyMode(esyBtn),false);
hardBtn.addEventListener("click", ()=>HardMode(hardBtn),false);

for(var i = 0; i < squares.length; i++)
{
	//add click listeners to squares
	squares[i].addEventListener("click", function() {
		//grab color of clicked squares
		var clickedColor = this.style.background;
		//compare color to pickedColor
		if(clickedColor === pickedColor) {
			messageDisplay.textContent = "Correct!";
			resetBtn.textContent = "Play Again?";
			changeColors(clickedColor);
            h1.style.background = clickedColor;
            score++;
            scoreMsg.textContent = score;
		} else {
			this.style.background = "#000000";
			messageDisplay.textContent = "Try Again";
		}
	});
}

//Method

function reset(el)
{
    var colors = [];
    console.log("Reset Event"); 
    if(modeStatus == 1){
        colors = generateRandomColors(nHardSq);
    }
    else{
        colors = generateRandomColors(nEaySq);
    }
    
    h1.style.background = "#4682b4";
    messageDisplay.textContent = "";
    resetBtn.textContent = "NEW COLOURS"
}

function easyMode(el)
{
    var colors =[];
    console.log("easyMode Event");
    updateSelectedClass(el);
    hideSquares();
    colors = generateRandomColors(nEaySq);
    modeStatus = 0; 
}

function HardMode(el)
{
    var colors = [];
    console.log("HardMode Event");    
    updateSelectedClass(el);
    showAllSquares();
    colors = generateRandomColors(nHardSq, colors);
    modeStatus = 1;
}

function updateSelectedClass(el)
{
    for(i = 0; i < mode.length; i++)
    {
        mode[i].classList.remove("selected");
        console.log("removed");
    }
    el.classList.add("selected");
    console.log("Selected Class Updated Successfully");    
}

function generateRandomColors(n)
{
    var arr = [];
    for(var i = 0; i < n; i++){
        arr.push(randomColor());
    }
    console.log("New Colours generated" + arr);
    updateSqs(n,arr);    
    return arr;
}

function randomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}


function updateSqs(n, arrColors){
    for(var i = 0; i < n; i++){
        squares[i].style.background = arrColors[i];
    }
    console.log("Squares Updated with Colors");
    pickColorAndUpdateQuestion(n, arrColors);
}

function pickColorAndUpdateQuestion(n,arrColors)
{
    var n = Math.floor(Math.random() * (n-1));
    pickedColor = arrColors[n];
    console.log(n);    
    console.log(n, pickedColor);
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    console.log("QuestionPicked");
}

function hideSquares(){
    for(var i = nEaySq; i < squares.length; i++)
    {        
        squares[i].style.display = "none";
    }
    console.log("Squares hidden");
}

function showAllSquares(){
    for(var i = nEaySq; i < squares.length; i++)
    {        
        squares[i].style.display = "block";
    }
    console.log("Squares Visible");
}

function changeColors(color) {
	//loop through all squares
	for(var i = 0; i < squares.length; i++) {
		//change each color to match given color
		squares[i].style.background = color;
	}
}