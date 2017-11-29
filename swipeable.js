var tabs = [],
    tabsX = [],
    tabsXTemp = [];
var touchstartx,
    touchmovex,
    movex,
    longTouch,
    direction,
    allowUpdate,
    width;

var length = 10,
    current_position = 1;

function jumpToTab(position) //1 based
{
    //set up jump tabs left=data|center|right
    if (position == 1)
    {
        var x = 0;
        for (var i = 0; i < tabs.length; i++)
        {
            tabs[i].style.transform = "translate(" + (x) + "px,0px)";
            tabsX[i] = x;
            getData(tabs[i], i);
            x += width;
        }
    }
    //set up jump tabs left|center=data|right
    if (position > 1 && position < length)
    {
        var x = -width;
        for (var i = 0; i < tabs.length; i++)
        {
            tabs[i].style.transform = "translate(" + (x) + "px,0px)";
            tabsX[i] = x;
            getData(tabs[i], position - 2 + i);
            x += width;
        }
    }
    //set up jump tabs left|center|right=data
    if (position == length) //9 6 7 8
    {
        var x = -width * 2;
        for (var i = 0; i < tabs.length; i++)
        {
            tabs[i].style.transform = "translate(" + (x) + "px,0px)";
            tabsX[i] = x;
            getData(tabs[i], position - 3 + i);
            x += width;
        }
    }
    tabsXTemp = tabsX;
    current_position = position;
}

function initSwipeTabs(getData, len, onSwipe)
{
    length = len;
    tabs[0] = document.getElementById('virtual_tab1');
    tabs[1] = document.getElementById('virtual_tab2');
    tabs[2] = document.getElementById('virtual_tab3');

    width = window.innerWidth;
    var x = 0;
    for (var i = 0; i < tabs.length; i++)
    {
        tabs[i].style.transform = "translate(" + (x) + "px,0px)";
        tabsX[i] = x;
        getData(tabs[i], i);
        x += width;
    }
    tabsXTemp = tabsX;



    document.getElementsByClassName('tab_holder')[0].addEventListener("touchstart", function(event)
    {
        start(event);
    });

    document.getElementsByClassName('tab_holder')[0].addEventListener("touchmove", function(event)
    {
        move(event);
    });

    document.getElementsByClassName('tab_holder')[0].addEventListener("touchend", function(event)
    {
        end(event, getData, onSwipe);
    });

}

function start(event)
{
    longTouch = false;
    setTimeout(function()
    {
        longTouch = true;
    }, 250);
    console.log(event);
    touchstartx = event.touches[0].pageX;
    for (var i = 0; i < tabs.length; i++)
    {
        tabs[i].setAttribute('class', 'tab_item');
    }

}

function move(event)
{

    touchmovex = event.touches[0].pageX;
    movex = (touchstartx - touchmovex) * 1;
    direction = movex < 0 ? -1 : 1;
    //console.log(direction);
    if (direction < 0 && current_position == 1 || direction > 0 && current_position == length)
    {
        //do not move right if at first
        //do no move left if at last
        allowUpdate = false;
    } else
    {
        allowUpdate = true;
        for (var i = 0; i < tabs.length; i++)
        {
            tabs[i].style.transform = "translate(" + (tabsX[i] - movex) + "px,0px)";
        }
    }
}

function end(event, getData, onSwipe)
{

    if (current_position >= 1 && current_position <= length)
    {
        if (Math.abs(movex) >= (width * 0.5) && allowUpdate)
        {
            current_position += direction;
            onSwipe(current_position - 1);
            tabsX = tabsXTemp;
            for (var i = 0; i < tabs.length; i++)
            {
                tabs[i].setAttribute('class', 'tab_item animate');
                tabs[i].style.transform = "translate(" + (tabsX[i] + (width * direction * -1)) + "px,0px)";
                tabsX[i] += (width * direction * -1);
            }
            for (var i = 0; i < tabsX.length; i++)
            {
                //check if we are at last virtual tab and first one is at negative egde
                if (tabsX[i] == width * -2)
                {
                    //shift this tab to last
                    tabsX[i] = width * 1;
                    tabs[i].setAttribute('class', 'tab_item');
                    tabs[i].style.transform = "translate(" + (tabsX[i]) + "px,0px)";

                    //update this tab content
                    getData(tabs[i], current_position); //current position is 1 based

                }
                //check if we are at first virtual tab and last one is at edge
                if (tabsX[i] == width * 2)
                {
                    //shift this tab to first 
                    tabsX[i] = width * -1;
                    tabs[i].setAttribute('class', 'tab_item');
                    tabs[i].style.transform = "translate(" + (tabsX[i]) + "px,0px)";

                    //update this tab content
                    getData(tabs[i], current_position - 2); //current position is 1 based
                }
            }
            tabsXTemp = tabsX;
        }
        else
        {
            tabsX = tabsXTemp;
            for (var i = 0; i < tabs.length; i++)
            {
                tabs[i].setAttribute('class', 'tab_item animate');
                tabs[i].style.transform = "translate(" + (tabsX[i]) + "px,0px)";
            }
        }
    }
    console.log("current position=" + current_position);
    touchstartx = 0;
    touchmovex = 0;
    movex = 0;
}