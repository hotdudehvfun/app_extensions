function addRippleEffect(event)
{
    var p=event.target;
    var ripple=null;
    var duration=400;
    for (var i = 0; i < p.children.length; i++)
    {
        if(p.children[i].getAttribute('data-tag')=="ripple")
        {
            ripple=p.children[i];
            break;
        }
    }

    if(ripple==null)
    {
        ripple=document.createElement('div');
        ripple.setAttribute('data-tag','ripple');
        p.appendChild(ripple);
    }
    //reset ripple
    ripple.style.transition="0s all";
    ripple.style.width="10px";
    ripple.style.height="10px";
    ripple.style.borderRadius="10px";
    ripple.style.background="rgba(150, 150, 150, 0.18)";
    ripple.style.position="absolute";
    //console.log(event,p.getBoundingClientRect());
    

    ripple.style.left=event.offsetX;
    ripple.style.top=event.offsetY;
    ripple.style.opacity=1;
    ripple.style.transition=(duration/1000)+"s all";

    setTimeout(function()
    {
       ripple.style.transform="scale(30)";
       ripple.style.opacity=1; 
    },5);

    setTimeout(function()
    {
        ripple.style.opacity=0;
    },duration);
    
    setTimeout(function()
    {
        ripple.style.transition="0s all";
        ripple.style.transform="scale(0)";        
    },duration+10);
}
function inflateCorrect(correct)
{
    switch(correct)
    {
        case 1:
        case "1":
        case "A":
        case "a":
        return 0;

        case 2:
        case "2":
        case "B":
        case "b":
        return 1;
        
        case 3:
        case "3":
        case "C":
        case "c":
        return 2;

        case 4:
        case "4":
        case "D":
        case "d":
        return 3;
        
        case 5:
        case "5":
        case "E":
        case "e":
        return 4;

    }
}
function getNRandomInts(min,max,n)
{
    var randoms=[];
    while(randoms.length!=n)
    {
        var num=getRandomInt(min,max);
        if(randoms.indexOf(num)==-1)
            randoms.push(num)
    }
    return randoms;
}
function hasDuplicates(arr)
{
  var sorted_arr = arr.slice().sort();
  for (var i = 0; i < arr.length - 1; i++)
  {
      if (sorted_arr[i + 1] == sorted_arr[i])
      {
          return true;
      }
  }
  return false;
}
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//swipe detect
function detectswipe(ele,func)
{
  swipe_det = new Object();
  swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  var min_x = 30;  //min x swipe for horizontal swipe
  var max_x = 30;  //max x difference for vertical swipe
  var min_y = 50;  //min y swipe for vertical swipe
  var max_y = 60;  //max y difference for horizontal swipe
  var direc = "";
  ele.addEventListener('touchstart',function(e){
    var t = e.touches[0];
    swipe_det.sX = t.screenX; 
    swipe_det.sY = t.screenY;
  },true);
  ele.addEventListener('touchmove',function(e){
    //e.preventDefault();
    var t = e.touches[0];
    swipe_det.eX = t.screenX; 
    swipe_det.eY = t.screenY;    
  },true);
  ele.addEventListener('touchend',function(e){
    //horizontal detection
    if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
      if(swipe_det.eX > swipe_det.sX) direc = "right";
      else direc = "left";
    }
    //vertical detection
    else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
      if(swipe_det.eY > swipe_det.sY) direc = "down";
      else direc = "up";
    }
    // console.log(direc);
    if(direc!="")
    {
        func(direc);
        direc="";
        swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
    }
  },true); 
}




function setPrimaryColor(color)
{
    document.getElementsByClassName('header_board')[0].style.background=color;
}