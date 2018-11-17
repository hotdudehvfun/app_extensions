


window.addEventListener("resize",function(){
	changeFontSize();
});

document.addEventListener("DOMContentLoaded",function()
{
	changeFontSize();
	updateNumbers(false);
});

document.getElementById('num3').addEventListener('click',function(argument)
{
	updateNumbers(false);
});

document.getElementById('num1').addEventListener('click',function(argument)
{
	isNum1Freezed=isNum1Freezed==true?false:true;
	if (isNum1Freezed)
	{
		document.getElementById('num1').style.border="1px solid";
	}else{
		document.getElementById('num1').style.border="0px solid";
	}
});

document.getElementById('num2').addEventListener('click',function(argument)
{
	isNum2Freezed=isNum2Freezed==true?false:true;
	if (isNum2Freezed)
	{
		document.getElementById('num2').style.border="1px solid";
	}else
	{
		document.getElementById('num2').style.border="0px solid";
	}
});

function getRandom(min,max)
{
	return Math.floor(Math.random() * (max - min)+min);
}

var timerId=null;
var isNum1Freezed=false,isNum2Freezed=false;
var num1,num2;
function updateNumbers(shouldAnimate)
{
	if(!isNum1Freezed)
		num1=getRandom(12,20);

	if(!isNum2Freezed)
		num2=getRandom(3,30);

	var num3=num1*num2;

	document.getElementById('num1').innerHTML=num1;
	document.getElementById('num2').innerHTML=num2;
	if (shouldAnimate)
	{
		var lastValue=parseInt(document.getElementById('num3').innerHTML);
		var dir=((num3 - lastValue)<=0)?-1:1;
		console.log(dir,lastValue,num3);
		clearInterval(timerId);
		var temp=lastValue;
		timerId=setInterval(function()
		{
			document.getElementById('num3').innerHTML=temp;
			if (temp==num3)
			{
				clearInterval(timerId);
				dir=0;
			}
			temp+=dir;
		},100);

	}else
	{
		document.getElementById('num3').innerHTML=num3;
	}
	document.getElementById('num3').setAttribute("data-result",(num1*num2));

}


function changeFontSize()
{
	var w=window.innerWidth;
	var h=window.innerHeight;
	var min=h<w?h:w;
	console.log(min);


	var size=min*0.3;
	document.getElementById('container').style.fontSize=size+"px";

}
