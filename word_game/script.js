var canvas,context;
const IOS_BLUE="#5AC8FA";
const IOS_YELLOW="#FDD100";
const READY=1,NOT_READY=2;
var game_state=null;
var gridSize=5;
var gridArray=null,block_gap=0;
var wordFormed=null,wordRequired=null,rootWord=null;
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
		resetGame();
	}
}
function checkWordFormed()
{
	if(wordFormed.trim()==wordRequired.trim())
	{
		console.log("correct");
		//generate new word
		wordRequired=getNewRequiredWord();
		mapWordInside(wordRequired);
	}else
	{
		console.log("no");
		//clear selected
		for (var i = 0; i <gridSize; i++)
		{		
			for (var j = 0; j <gridSize; j++)
			{
				//console.log(x,y);
				gridArray[i][j].isSelected=false;
			}
		}
	}
}
function resetGame(argument)
{
	game_state=NOT_READY;
	
	//grid calculations
	var width=window.innerWidth;
	var height=window.innerHeight;

	var block_start_y=100,block_start_x=20;

	var block_max_width=80;
	var block_x=gridSize;
	var block_width=(width/(block_x+1));
	if(block_width>block_max_width)
		block_width=block_max_width;
	
	var block_height=block_width;
	block_gap=block_width/(block_x+1);
	if(block_start_x>block_gap)
		block_start_x=block_gap;
	gridArray=[];
	var x=block_start_x,y=block_start_y;
	for (var i = 0; i <gridSize; i++)
	{
		
		gridArray[i]=[];
		for (var j = 0; j <gridSize; j++)
		{
			//console.log(x,y);
			gridArray[i][j]={};
			gridArray[i][j].x=x;
			gridArray[i][j].y=y;
			gridArray[i][j].char=getRandomChar();
			gridArray[i][j].isSelected=false;
			gridArray[i][j].width=block_width;
			x+=block_width+block_gap;
		}
		y+=block_width+block_gap;
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
	//max can be 17 chars
	var startX=getRandomInt(1,gridSize-2);
	var startY=getRandomInt(1,gridSize-2);
	var path=[];
	path.push(startX+"#"+startY);
	var pos=1,iterationControl=200;
	var directionArray=
	[
			[-1,-1],//up left
			[0,-1],//up
			[1,-1],//up right
			[1,0],//right
			[1,1],//down right
			[0,1],//down
			[-1,1],//left down
			[-1,0]//left
	];
	directionArray.sort(function(){0.5-Math.random()});	
	var directionPos=0;
	while(pos<word.length && iterationControl>0)
	{
		//check next available cell
		var result=checkDirectionAvailable(directionArray[directionPos][0],directionArray[directionPos][1]);
		if(result)
		{
			path.push(
				(startX+directionArray[directionPos][0])+"#"+(startY+directionArray[directionPos][1])
				);
			pos++;
		}

		iterationControl--;
		directionPos++;
		if(directionPos>=directionArray.length)
		{
			directionPos=0;
		}
	}
	function checkDirectionAvailable(stepX,stepY)
	{
		if(startX+stepX>0&&startX+stepX<gridSize && startY+stepY<gridSize && startY+stepY>0)
				return path.indexOf((startX+stepX)+"#"+(startY+stepY))==-1;//true if new
	}

	console.log(word,word.length,path);
	for (var i = 0; i <gridSize; i++)
	{		
		for (var j = 0; j <gridSize; j++)
		{
			//console.log(x,y);
			gridArray[i][j].char=getRandomChar();
			gridArray[i][j].isSelected=false;
		}
	}
	if(word.length==path.length)
	{
		//map in grid
		for (var i = 0; i < path.length; i++)
		{
			var p=path[i].split("#");
			var x=parseInt(p[0]);
			var y=parseInt(p[1]);
			gridArray[x][y].char=word[i];
		}

	}

}
function getNewRequiredWord()
{
	var wordArray=masterWordList[getRandomInt(0,masterWordList.length-1)];
	wordArray.sort(function(a,b){ 
		 // ASC  -> a.length - b.length
  		// DESC -> b.length - a.length
  		return a.length - b.length;
	 });
	rootWord=wordArray[0];
	wordRequired=wordArray[1];
	
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
 			for (var i = 0; i < gridSize; i++)
 			{
 				for (var j = 0; j < gridSize; j++)
 				{
 					if(!gridArray[i][j].isSelected)
 					{
	 					if(touchInBounds(touchX,touchY,gridArray[i][j].x,gridArray[i][j].y,gridArray[i][j].width,gridArray[i][j].width))
			 			{
			 				gridArray[i][j].isSelected=true;
			 				wordFormed+=gridArray[i][j].char;
			 			}		
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
	var fontSize=gridArray[0][0].width*0.32;
	context.textAlign="center";
	context.font= fontSize+"px sans-serif"
	context.fillStyle="#111";
	context.fillText("Synonym of",window.innerWidth/2,fontSize+10);
	context.fillText(rootWord+" is",window.innerWidth/2,(fontSize*2)+10);
	context.fillText(wordRequired,window.innerWidth/2,(fontSize*3)+10);


	//grid
	context.shadowBlur=gridArray[0][0].width*0.2;
	context.shadowColor="rgba(128, 128, 128, 0.46)";
	context.font= gridArray[0][0].width*0.5+"px sans-serif"
	
	var x=0,y=block_gap;
	for (var i = 0; i <gridSize; i++)
	{
		x=block_gap;
		for (var j = 0; j <gridSize; j++)
		{
			var gridItem=gridArray[i][j]
			if(gridItem.isSelected)
				context.fillStyle=IOS_BLUE;
			else
				context.fillStyle=IOS_YELLOW;

			context.fillRect(gridItem.x,gridItem.y,gridItem.width,gridItem.width);
			context.fillStyle="white";
			context.fillText(gridItem.char,gridItem.x+gridItem.width/2,gridItem.y+gridItem.width/2);
			x+=gridItem.width+block_gap;

		}
		y+=gridItem.width+block_gap;
	}
	requestAnimationFrame(drawGrid);
}


