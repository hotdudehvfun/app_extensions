var canvas,context;
const IOS_BLUE="#5AC8FA";
const IOS_YELLOW="#FDD100";
const ANDROID_MAGENTA="#e91e63";
const READY=1,NOT_READY=2;
var game_state=null;
var gridSize=4;
var gridArray=null,block_gap_x=0,block_gap_y=0;
var wordFormed=null,wordRequired=null,rootWord=null;
var isWrong;
var colorScheme=[];
var appreciateMessages=["Great!","Well Done!","Good Job!","Nice!"];
var fontFamily="Droid Sans Mono";
colorScheme.push("#3cb03b");
colorScheme.push("#6bc552");
colorScheme.push("#8fc758");
colorScheme.push("#bad174");
document.addEventListener("DOMContentLoaded",function(argument)
{
	initCanvas();
})
function initCanvas()
{
	canvas=document.createElement("canvas");
	canvas.setAttribute("width",window.innerWidth);
	canvas.setAttribute("height",window.innerHeight);
	document.getElementsByTagName('body')[0].appendChild(canvas);
	document.addEventListener("touchstart",function(e)
	{
		wordFormed="";
	});
	document.addEventListener("touchend",function(e)
	{
		checkWordFormed();
	});

	document.addEventListener("touchmove",function(e)
	{
		getMousePos(e);
	});

	context=canvas.getContext("2d");
	if(context==null)
	{
		alert('Game not supported on this device');
	}else
	{
		//document.getElementById('theme').play();
		resetGame();
	}
}
function checkWordFormed()
{
	if(wordFormed.trim().toLowerCase()==wordRequired.trim().toLowerCase())
	{
		playAudio('correct.wav');
		console.log("correct");
		//generate new word
		appreciate(appreciateMessages[getRandomInt(0,appreciateMessages.length-1)]);
		wordRequired=getNewRequiredWord();
		mapWordInside(wordRequired);
		isWrong=false;
	}else
	{
		// playAudio('incorrect');
		playAudio('wrong.wav');
		console.log("no");
		appreciate("Try Again!");
		isWrong=true;
		
		setTimeout(function()
		{
			for (var i = 0; i <gridSize*gridSize; i++)
			{		
				gridArray[i].isSelected=false;
				isWrong=false;
			}
		},500);
		
	}
}
function resetGame(argument)
{
	game_state=NOT_READY;	
	//grid calculations
	var width=window.innerWidth;
	var height=window.innerHeight;


	var max_size=80;
	var block_x=gridSize;
	var block_width=(width/(block_x+1));
	var block_height=block_width;

	if(block_width>max_size)
		block_width=max_size;



	block_gap_x=block_width/block_x;
	block_gap_y=10;
	var block_start_x=(width-(block_width*gridSize)-(block_gap_x*(gridSize-1)))/2;

	var fontSize=block_width*0.32;
	gridArray=[];
	var x=block_start_x,y=fontSize*6;
	var num=0;
	for (var i = 0; i <gridSize; i++)
	{
		
		for (var j = 0; j <gridSize; j++)
		{
			//console.log(x,y);
			gridArray[num]={};
			gridArray[num].x=x;
			gridArray[num].y=y;
			gridArray[num].char=num+1;
			gridArray[num].isSelected=false;
			gridArray[num].width=block_width;
			num++;
			x+=block_width+block_gap_x;
		}
		y+=block_width+block_gap_y;
		x=block_start_x;
	}
	//place required word inside grid
	wordFormed="";
	wordRequired=getNewRequiredWord();
	mapWordInside(wordRequired);


	game_state=READY;
	
	drawGrid();

}
function mapWordInside(word)
{

	 //word="discrimination";
	//visted nodes
	var visitedNodes=[];

	//init first node
	var node=getRandomInt(1,gridSize*gridSize);
	//if(word.length>=7)
	//	node=16;
	visitedNodes.push(node);
	var i=word.length*10;
	while(visitedNodes.length<word.length && i>=0)
	{
		//left -1
		//right +1
		//up -4
		//down +4
		
		//up left -5
		//up right -3
		
		//down left +3
		//down right +5

		//get available nodes next to previous node
		var lastNode=visitedNodes[visitedNodes.length-1];
		console.log("%clastNode="+lastNode,"color:red");
		var availableNodes=getNodesAroundLastNode(lastNode,visitedNodes);
		if(availableNodes.length==0)
		{
			//reset nodes and start again
			console.log("%c starting again","color:green");
			lastNode=16;
			visitedNodes=[];
			visitedNodes.push(lastNode);
			availableNodes=getNodesAroundLastNode(lastNode,visitedNodes);
		}
		console.log("availableNodes="+availableNodes);

		//selected any node from available
		//availableNodes.sort(function(){0.5 - Math.random()});
		var selectedNode=availableNodes[0];
		console.log("selectedNode="+selectedNode);
		visitedNodes.push(selectedNode);		
		i--;
	}
	console.log(word,word.length,visitedNodes);

	//now fill inside grid
	for (var i = 0; i <gridSize*gridSize; i++)
	{		
			gridArray[i].char=getRandomChar();
			gridArray[i].isSelected=false;
	}
	if(word.length==visitedNodes.length)
	{
		//map in grid
		for (var i = 0; i < visitedNodes.length; i++)
		{
			var num=visitedNodes[i];
			gridArray[num-1].char=word[i].toUpperCase();
		}

	}

}
function getNodesAroundLastNode(lastNode,visitedNodes)
	{
		var nodes=[];
		var node_left=lastNode-1;
			if(node_left<=0||node_left==4||node_left==8||node_left==12)
			{
				node_left=-1;
			}else{
				nodes.push(node_left);
			}
		
		var node_right=lastNode+1;
			if(node_right==5||node_right==9||node_right==13||node_right==17)
			{
				node_right=-1;
			}else{
				nodes.push(node_right);
			}
		
		var node_up=lastNode-4;
			if(node_up<=0)
			{
				node_up=-1;
			}else{
				nodes.push(node_up);
			}
		
		var node_down=lastNode+4;
			if(node_down>16)
			{
				node_down=-1;
			}else{
				nodes.push(node_down);
			}
		
		var node_up_left=lastNode-5;
			if(node_up_left<=0||node_up_left==4||node_up_left==8)
			{
				node_up_left=-1;
			}else{
				nodes.push(node_up_left);
			}
		
		var node_up_right=lastNode -3;
			if(node_up_right<=0||node_up_right==1||node_up_right==13||node_up_right==9||node_up_right==5)
			{
				node_up_right=-1;
			}else{
				nodes.push(node_up_right);
			}
		
		var node_down_left=lastNode +3;
			if(node_down_left>16||node_down_left==4||node_down_left==8||node_down_left==12)
			{
				node_down_left=-1;
			}else{
				nodes.push(node_down_left);
			}
		
		var node_down_right=lastNode +5;
			if(node_down_right>16||node_down_right==1||node_down_right==5||node_down_right==9||node_down_right==13)
			{
				node_down_right=-1;
			}
			else{
				nodes.push(node_down_right);
			}

			//now remove those nodes which are in visited nodes
			//[1,2,3] [2,3]
			//console.log(nodes,visitedNodes);
			nodes.sort(function(){0.5-Math.random()});
			var temp=[];
			for (var i = 0; i < nodes.length; i++)
			{
				var n=nodes[i];
				if(visitedNodes.indexOf(n)==-1)//available node is not in visited so it can be used
				{
					temp.push(n);
				}
			}
			return temp;
}




function getNewRequiredWord()
{
	var wordArray=masterWordList[getRandomInt(0,masterWordList.length-1)];
	console.log(wordArray);
	wordArray.sort(function(a,b)
	{ 
		 // ASC  -> a.length - b.length
  		// DESC -> b.length - a.length
  		return b.length - a.length;
	 });
	rootWord=wordArray[0];//longest
	wordRequired=wordArray[getRandomInt(1,wordArray.length-1)];	
	return wordRequired;

}
function getRandomChar()
{
	var min=65,max=90;
	var r=Math.floor(Math.random()*(max-min+1))+min;
	return String.fromCharCode(r);

}
function getRandomInt(min,max)
{
	return Math.floor(Math.random()*max-min+1)+min;
}
 function getMousePos(evt)
 {
 		//console.log(evt.targetTouches[0].clientX);
 		if(READY==game_state)
 		{
 			var touchX=evt.targetTouches[0].clientX;
 			var touchY=evt.targetTouches[0].clientY;
 			for (var i = 0; i < gridSize*gridSize; i++)
 			{
 					if(!gridArray[i].isSelected)
 					{
	 					if(touchInBounds(touchX,touchY,gridArray[i].x,gridArray[i].y,gridArray[i].width,gridArray[i].width))
			 			{
			 				gridArray[i].isSelected=true;
			 				wordFormed+=gridArray[i].char;

			 				playAudio("pop.wav");
			 			}		
 					}
 			}
 			
 		}

 }
 function touchInBounds(touchX,touchY,startX,startY,xLen,yLen)
 {
 	var xflag=false,yflag=false;
 	if(touchX>=startX&&touchX<=startX+xLen)
 	{
 		xflag=true;
 	}
 	if(touchY>=startY&&touchY<=startY+yLen)
 	{
 		yflag=true;
 	}
 	if(xflag&&yflag)
 		return true;

 	return false;

}

function drawGrid()
{
	context.clearRect(0,0,window.innerWidth,window.innerHeight);
	//heading
	var fontSize=gridArray[0].width*0.32;
	context.textAlign="center";
	context.shadowBlur=0;
	context.font= fontSize+"px "+fontFamily;
	context.fillStyle="white";
	context.fillText("Synonym of",window.innerWidth/2,fontSize*1.2);
	context.fillText(rootWord.toUpperCase()+" is",window.innerWidth/2,(fontSize*2.8));
	context.fillText(wordRequired.toUpperCase(),window.innerWidth/2,(fontSize*4.2));


	//grid
	context.shadowBlur=gridArray[0].width*0.2;
	context.shadowColor="rgba(128, 128, 128, 0.46)";
	fontSize=gridArray[0].width*0.5;
	context.font= fontSize+"px "+fontFamily;
	
	var num=0;
	for (var i = 0; i <gridSize; i++)
	{
		for (var j = 0; j <gridSize; j++)
		{
			var gridItem=gridArray[num++];
			if(gridItem.isSelected)
			{
				//selected color
				context.fillStyle=IOS_BLUE;
				if(isWrong)
					context.fillStyle=ANDROID_MAGENTA;
			}	
			else
				context.fillStyle=IOS_YELLOW;

			context.fillRect(gridItem.x,gridItem.y,gridItem.width,gridItem.width);
			context.fillStyle="white";
			context.fillText(gridItem.char,gridItem.x+gridItem.width/2,gridItem.y+gridItem.width/2+fontSize/2);
		}
	}
	requestAnimationFrame(drawGrid);
}


function playAudio(fileName)
{
	var audio = new Audio(fileName);
	audio.play();
}

function cleanMasterList()
{
	for(var i=0;i<masterWordList.length;i++)
	{
		masterWordList[i].sort(function(a,b){ return a.length - b.length;} );
	}
}


function appreciate(msg)
{
	var div=document.createElement("div");
	div.setAttribute('class','animate');
	div.style.fontSize=gridArray[0].width*0.5+"px";
	div.style.fontFamily=fontFamily+", sans-serif";
	div.innerHTML=msg.trim();
	//div.style.left=(window.innerWidth/2)+"px";
	div.style.top=(window.innerHeight*0.5)+"px";
	document.getElementById('body').appendChild(div);
	setTimeout(function(argument)
	{
		div.style.top=(window.innerHeight*0.3)+"px";
		div.style.opacity=0;
	},500);
	setTimeout(function(argument)
	{
		document.getElementById('body').removeChild(div);
	},500+1000);


}