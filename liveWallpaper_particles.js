var canvas,context;
var particleList=[];
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
		initParticles();
		drawLetters();
	}
}
function initParticles()
{
	var totalParticles=25;	
	var speed=[0.1,0.2,0.5,0.7];
	var size=[1,2,3,4];
	var layers=4;
	particleList=[];	
	for (var j = 0; j < layers; j++)
	{
		for (var i = 0; i < totalParticles; i++)
		{
			var particle={};
			particle.speed=speed[j];
			particle.color=materialColors[getRandomInt(0,materialColors.length-1)];
			particle.x=getRandomInt(0,canvas.width);
			particle.y=getRandomInt(0,canvas.height);
			particle.size=size[j];
			particleList.push(particle);
		}			
	}
}
function drawLetters()
{
	context.clearRect(0,0,canvas.width,canvas.height);
	for (var i = 0; i < particleList.length; i++)
	{
		context.fillStyle=particleList[i].color;
		context.beginPath();
		context.arc(particleList[i].x,particleList[i].y,particleList[i].size,0,2*Math.PI);
		context.closePath();
		context.fill();
		particleList[i].x+=(particleList[i].speed*textDir);
		if(particleList[i].x>canvas.width+10)
		{
			particleList[i].x=-10;
		}
		if(particleList[i].x<-10)
		{
			particleList[i].x=canvas.width+10;
		}
	}	
	requestAnimationFrame(drawLetters);
}
