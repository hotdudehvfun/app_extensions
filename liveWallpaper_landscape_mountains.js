var canvas,context;
var particleList=[];
var textDir=-1;
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

	setTimeout(function()
	{
		initCanvas();
	},0);

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
var largestSize;
function initParticles()
{
	var totalParticles=10;	
	var speed=1;
	var size=0.2;
	largestSize=canvas.width*size;
	var layers=4;
	particleList=[];	
	for (var j = 0; j < layers; j++)
	{
		for (var i = 0; i < totalParticles; i++)
		{
			var particle={};
			particle.color=materialColors[getRandomInt(0,materialColors.length-1)];
			particle.x=getRandomInt(0,canvas.width);
			particle.y=getRandomInt(0,canvas.height);
			particle.size=canvas.width*size;
			size*=0.8;
			particle.speed=speed;
			speed*=0.8;
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
		//context.arc(particleList[i].x,particleList[i].y,particleList[i].size,0,2*Math.PI);
		roundRect(particleList[i].x,particleList[i].y,particleList[i].size*2,particleList[i].size,particleList[i].size*0.5)
		context.closePath();
		context.fill();
		particleList[i].y+=(particleList[i].speed*textDir);
		
		// if(particleList[i].y>canvas.width+(largestSize*2))
		// {
		// 	particleList[i].y=-(largestSize*5);
		// }
		if(particleList[i].y<-(largestSize*5))
		{
			particleList[i].y=canvas.width+(largestSize*5);
		}
	}	
	requestAnimationFrame(drawLetters);
}
function roundRect(x, y, width, height, radius)
{

  var ctx=context;			
  if (typeof stroke == 'undefined')
  {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  ctx.fill();

}