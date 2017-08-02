var canvas,context;
var lettersList=[];
var questionItem={};
var textDir=1;
var materialColors=[];
materialColors.push("rgba(244, 67, 54,0.6)");
materialColors.push("rgba(233, 30, 99,0.6)");
materialColors.push("rgba(156, 39, 176,0.6)");
materialColors.push("rgba(103, 58, 183,0.6)");
materialColors.push("rgba(33, 150, 243,0.6)");
materialColors.push("rgba(3, 169, 244,0.6)");
materialColors.push("rgba(0, 188, 212,0.6)");
materialColors.push("rgba(0, 150, 136,0.6)");
materialColors.push("rgba(255, 235, 59,0.6)");
materialColors.push("rgba(255, 87, 34,0.6)");
document.addEventListener("DOMContentLoaded",function()
{
	setTimeout(function(){
		initCanvas();
	},2000);
});
window.addEventListener("resize",function()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});
function initCanvas()
{
	canvas=document.getElementById('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.opacity=1;
	context=canvas.getContext("2d");
	if(context==undefined||context==null)	
	{
		alert("canvas not supported");
	}else
	{
		console.log("supported");
		initLetters();
		drawLetters();
	}
}
function initLetters()
{
	var totalLetters=25;	
	var speed=[0.1,0.2,0.3,0.4];
	var size=[5,6,7,8];
	var layers=4;
	lettersList=[];	
	for (var j = 0; j < layers; j++)
	{
		for (var i = 0; i < totalLetters; i++)
		{
			var letter={};
			letter.char=String.fromCharCode(getRandomInt(97,122));
			letter.isRequired=false;
			letter.speed=speed[j];
			letter.color=materialColors[getRandomInt(0,materialColors.length-1)];
			letter.x=getRandomInt(0,canvas.width);
			letter.y=getRandomInt(0,canvas.height);
			letter.size=size[j];
			lettersList.push(letter);
		}			
	}
}
function drawLetters()
{
	context.clearRect(0,0,canvas.width,canvas.height);
	for (var i = 0; i < lettersList.length; i++)
	{
		context.fillStyle=lettersList[i].color;
		context.font=lettersList[i].size+"px sans-serif";
		context.fillText(lettersList[i].char,lettersList[i].x,lettersList[i].y);
		lettersList[i].x+=(lettersList[i].speed*textDir);
		if(lettersList[i].x>canvas.width+10)
		{
			lettersList[i].x=-10;
		}
		if(lettersList[i].x<-10)
		{
			lettersList[i].x=canvas.width+10;
		}
	}	
	requestAnimationFrame(drawLetters);
}
