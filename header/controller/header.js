/*
import these three js libraries in the header part of your html file to make the header works properly

<link rel="stylesheet" href="/portfolio/header/view/css/nav_Bar.css">
<link rel="stylesheet" href="/portfolio/header/view/css/bootstrap.css">

<script src="/portfolio/header/controller/jquery-3.3.1.min.js" defer></script>
<script src="/portfolio/header/controller/bootstrap.min.js" defer></script>    
<script src="/portfolio/header/controller/header.js" async></script>

after that call the header function to access the header part
active_Dropdoen_Menu is optional use it if you have active drop down menu
but the active menu is required

header(active_Menu, active_Dropdown_Menu) 

eg.
header("News", "One"); for menus which have drop down 
or
header("News"); for menus which don't have drop down


*/



function calling_Css(css){
    // Get HTML head element
    
    var head = document.getElementsByTagName('HEAD')[0]; 
    
    for(var i=0; i<css.length; i++){
        // Create new link Element
        var link = document.createElement('link');
        // set the attributes for link element 
        link.rel = 'stylesheet';       
        link.type = 'text/css';  
        link.href = '/portfolio/header/view/'+css[i];
        // Append link element to HTML head
        head.appendChild(link);
    }
    
}



function dom_Navigation(){
    //clear the navigation
    document.getElementById('nav_Bar').innerHTML = '';

    //container navigation
    var nav = document.createElement("NAV");
    nav.setAttribute("class", "navbar nav_Bar_Styles");
    nav.setAttribute("id", "Nav");
    document.getElementById('nav_Bar').appendChild(nav);

    //container next to navigation
    var div = document.createElement("DIV");
    div.setAttribute("class", "navbar nav_Bar_Styles");
    div.setAttribute("id", "top_Nav");
    document.getElementById('Nav').appendChild(div);

    //container 
    var div = document.createElement("DIV");
    div.setAttribute("class", "container");
    div.setAttribute("id", "container_Nav");
    document.getElementById('top_Nav').appendChild(div);

    //logo and icon container 
    var div = document.createElement("DIV");
    div.setAttribute("class", "navbar-header");
    div.setAttribute("style", "text-align: center;");
    div.setAttribute("id", "container_Logo");
    document.getElementById('container_Nav').appendChild(div);
    logo_Part();

    //menu part container
    var div = document.createElement("DIV");
    div.setAttribute("class", "collapse navbar-collapse");
    div.setAttribute("id", "myNavbar");
    document.getElementById('container_Nav').appendChild(div);    
}

function logo_Part(){    
    //logo and icon container 

    //creating the button for small windows
    var button = document.createElement("BUTTON");
    button.setAttribute("class", "navbar-toggle");
    button.setAttribute("type", "button");
    button.setAttribute("data-toggle", "collapse");
    button.setAttribute("data-target", "#myNavbar");
    button.setAttribute("id", "container_Button");
    document.getElementById('container_Logo').appendChild(button);

    //the three bars of the drop dawn button
    var span = document.createElement("SPAN");
    span.setAttribute("class", "icon-bar");
    document.getElementById('container_Button').appendChild(span);

    var span = document.createElement("SPAN");
    span.setAttribute("class", "icon-bar");
    document.getElementById('container_Button').appendChild(span);

    var span = document.createElement("SPAN");
    span.setAttribute("class", "icon-bar");
    document.getElementById('container_Button').appendChild(span);

    //logo image is here
    var a = document.createElement("A");
    a.setAttribute("class", "navbar-brand");
    a.setAttribute("href", "index.html");
    a.setAttribute("id", "nav_Logo_A");
    document.getElementById('container_Logo').appendChild(a);

    var img = document.createElement("IMG");
    img.setAttribute("style", "width: 200px; height: 50px;");
    img.setAttribute("src", "http://localhost/portfolio/header/view/img/Tinsae.svg");
    document.getElementById('nav_Logo_A').appendChild(img);
}


function menu_Create(headerLink){   
    //menu unordered list to list all menues in the navigation bar 
    var ul = document.createElement("UL");
    ul.setAttribute("class", "nav navbar-nav");
    ul.setAttribute("id", "myNavbar_Ul");
    document.getElementById('myNavbar').appendChild(ul);

    //navigate through menu object
    for(var i=0; i<Object.keys(headerLink).length; i++){        
        
        //check if there is a drop down link
        if(headerLink[i]["drop"]){
            
            //creating the li element for the menu for the drop down menu
            var li = document.createElement("LI");              
            li.setAttribute("id", "myNavbar_Li"+i);
            document.getElementById('myNavbar_Ul').appendChild(li);
        
            //header links for the menu for the drop down menu
            var a = document.createElement("A");
            if(headerLink[i]["active"]){
                a.setAttribute("class", "dropdown active");
            }
            a.setAttribute("data-toggle", "dropdown");    
            a.setAttribute("id", "menu"+headerLink[i]["menuName"]+i);       
            a.innerHTML = headerLink[i]["menuName"];
            document.getElementById('myNavbar_Li'+i).appendChild(a);

            //creating span to hold the down arrow for the drop down menu
            var span = document.createElement("SPAN");
            span.setAttribute("class", "caret"); 
            document.getElementById("menu"+headerLink[i]["menuName"]+i).appendChild(span);                
            
            //creating ul for the drop down menu
            var ul = document.createElement("UL");
            ul.setAttribute("class", "dropdown-menu");
            ul.setAttribute("id", "myNavbar_Drop"+i);
            document.getElementById("myNavbar_Li"+i).appendChild(ul);

            //navigating through the drop down object
            for(var j=0; j<Object.keys(headerLink[i]["dropDown"]).length; j++){
                //creating id for the drop down li element to put all links in the specific li
                id_2 = headerLink[i]["dropDown"][j]["dropName"]+j+i;
                
                //creating li elemenet
                var li = document.createElement("LI");
                li.setAttribute("id", "myNavbar_Drop_Li"+id_2);
                document.getElementById("myNavbar_Drop"+i).appendChild(li);
                
                //header links for the drop doen menus
                var a = document.createElement("A");
                if(headerLink[i]["dropDown"][j]["active"]){
                    a.setAttribute("class", "active");
                }
                a.setAttribute("href", headerLink[i]["dropDown"][j]["dropLink"]);
                a.innerHTML = headerLink[i]["dropDown"][j]["dropName"];
                document.getElementById("myNavbar_Drop_Li"+id_2).appendChild(a);
                
            }
        }else{
            //creating li for the normal links
            var li = document.createElement("LI");
            li.setAttribute("id", "myNavbar_Li"+i);
            document.getElementById('myNavbar_Ul').appendChild(li);

            //header links for the normal links
            var a = document.createElement("A");
            if(headerLink[i]["active"]){
                a.setAttribute("class", "active");
            }                    
            a.setAttribute("href", headerLink[i]["menuLink"]);
            a.setAttribute("id", "menu"+headerLink[i]["menuName"]+i); 
            a.innerHTML = headerLink[i]["menuName"];
            document.getElementById('myNavbar_Li'+i).appendChild(a);
        }  
    }
}



function header(active_Menu, active_Drop = null){
    //css links and css file names
    // var css_Link = ['css/nav_Bar.css', 'css/bootstrap.css'];

    //calling css function
    // calling_Css(css_Link);

    //importing the navigation containers
    dom_Navigation();

    //drop down one object
    const dropDown1 = {
        0:{dropName: "One", dropLink: "index.html", active:false},
        1:{dropName: "Two", dropLink: "index.html", active:false},
    }

    //drop down two object
    const dropDown2 = {
        0:{dropName: "Three", dropLink: "index.html", active:false},
        1:{dropName: "Four", dropLink: "index.html", active:false},
    }

    //menu object
    const headerLink = {
        0:{menuName: "Home", menuLink: "/portfolio/front/view/index.html", active:false, drop:false, dropDown: null},
        1:{menuName: "About", menuLink: "/portfolio/second/view/index.html", active:false, drop:false, dropDown: null},
        2:{menuName: "News", menuLink: "index.html", active:false, drop:true, dropDown: dropDown1},
        3:{menuName: "Services", menuLink: "index.html", active:false, drop:true, dropDown: dropDown2},
        4:{menuName: "Contact", menuLink: "index.html", active:false, drop:false, dropDown: null},
    };

    //navigating through the menu object
    for(var i=0; i<Object.keys(headerLink).length; i++){
        //choose which menu item is active
        if(headerLink[i]["menuName"] == active_Menu){
            //set heder menu active
            headerLink[i]["active"] = true;
            //choose if it have drop down menu or not 
            if(headerLink[i]["drop"]){
                //navigating through the drop down icon
                for(var j=0; j<Object.keys(headerLink[i]["dropDown"]).length; j++){
                    //selecting drop down menu which is active
                    if(headerLink[i]["dropDown"][j]["dropName"] == active_Drop){
                        //put the drop down menu active
                        headerLink[i]["dropDown"][j]["active"] = true;
                    }
                }
            }
        }
    }

    menu_Create(headerLink)
}




//another way to create a header for the page using teplate literals

function header_Element(active_Menu, active_Drop = null){   
    const content = `
        <nav class="navbar nav_Bar_Styles">
            <div class="container">
            <div class="navbar-header" style="text-align: center;">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>                        
                </button>
                <a class="navbar-brand" href="index.html"><img src="/portfolio/header/view/img/Tinsae.png" alt="Tinsae Getachew" style="width: 200px; height: 50px;"></a>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav">
                <li><a href="https://www.linkedin.com/in/tinsae-getachew-57722a156/" class="${active_Menu=='Home' ? 'active' : ''}"><i class='fab fa-linkedin'></i></a></li>              
                <li><a href="https://www.facebook.com/tinsaeg2/" class="${active_Menu=='About' ? 'active' : ''}"><i class='fab fa-facebook'></i></a></li>
                <!--<li class="dropdown ${active_Menu=='Attractions' ? 'active' : ''}">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">Attractions<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                    <li><a href="entertainment.html" class="${active_Drop=='yes' ? 'active' : ''}">Entertainment</a></li>
                    <li><a href="shopping.html">Shopping</a></li>
                    <li><a href="dining.html">Dining</a></li>
                    <li><a href="heritage.html">Heritage</a></li>
                    </ul>
                </li>-->
                <li><a href="https://t.me/TINSGET" class="${active_Menu=='A' ? 'active' : ''}"><i class='fab fa-telegram'></i></a></li>
                <li><a href="https://github.com/tinsget2" class="${active_Menu=='A' ? 'active' : ''}"><i class='fab fa-github'></i></a></li>
                
                </ul>
            </div>
            </div>
        </nav>
    `;


    document.getElementById('nav_Bar').innerHTML = content;
}



const flex_Header = () =>{
    const headFlex = `<nav style="width: 100%; background-color: rgb(83, 11, 11);">
                        <div class="head_Container">
                            <div class="head_Container_Item">
                                <button type="button" class="dope_Icon_Container">
                                    <span class="drop-icon"></span>
                                    <span class="drop-icon"></span>
                                    <span class="drop-icon"></span>                        
                                </button>
                                <a class="head_Container_Logo">
                                    <img src="/portfolio/header/view/img/Tinsae.svg" alt="Company Logo" class="head_Container_Logo_Item">
                                    <!-- <span class="head_Container_Logo_Item">Tinsae Getachew</span> -->
                                </a>
                            </div>
                            <div class="head_Container_Item">
                                <ul class="head_Container_Link">
                                    <li class="head_Container_Link_Item">Home</li>
                                    <li class="head_Container_Link_Item">About</li>
                                    <li class="head_Container_Link_Item">Contact</li>
                                    <li class="head_Container_Link_Item">Contact</li>
                                    <li class="head_Container_Link_Item">Home</li>
                                    <li class="head_Container_Link_Item">About</li>
                                    <li class="head_Container_Link_Item">Contact</li>
                                    <li class="head_Container_Link_Item">Contact</li>
                                </ul>
                            </div>
                        </div>
                    </nav>`;

    document.getElementById('nav_Bar').innerHTML = headFlex;
}

// (function(){
//     //header_Element();
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const active = urlParams.get('active');

//     header(active);
// })();