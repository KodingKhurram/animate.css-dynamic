/*
 * animate.js - https://kodingkhurram.github.io/animate.css-dynamic.demo
 * Version - v3.0.0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT

 * Copyright (c) 2021 Mohammed Khurram (KodingKhurram)
 */

window.addEventListener("load", function() {
  //aniCus_text initializaion
  aniCus_text();
  //Dramatic animations, initialization
  aniUtil_dramatic();
  //view animations initialization
  view_Animations();
  //click animations initialization
  click_Animations();
  //hover animation initialization
  hover_Animations();
  //inner animations initializaion
  inner_Animations();
});

//On scroll of Window
window.addEventListener("scroll", function() {
  view_Animations();
});

//On KeyPress
window.addEventListener("keyup", function(e){
  key_Animations(e);
});

/* -----Function definitions----- */
//aniUtil_dramatic
function aniUtil_dramatic(){
  //This function initializes element for dramatic animations
  document.querySelectorAll(".aniUtil_dramatic").forEach(element => {
    element.style.opacity = "100";
    if(!element.classList.contains("aniUtil_disabled") && !element.classList.contains("animate__animated")){
      element.style.opacity = "0";
    }
  });
}
//view animations
function view_Animations(){
  //This function initializes the scroll animations
  //Ordinary animations
  document.querySelectorAll("*[class*='ani_']:not([class*='aniUtil_onClick']):not([class*='aniUtil_onMouse']):not([class*='aniUtil_onKey']):not([class*='aniUtil_disabled'])").forEach(element => {
    //Get the animation classes

    var ani_classes = get_aniClasses(element);

    //Check visibility then animate
    if (isScrolledIntoView(element) === "full" ) {
      if(!element.classList.contains("aniUtil_animating") && !element.classList.contains("animate__animated")){
        if(element.classList.contains("aniUtil_dramatic")){
          element.style.opacity = 100;
        }
        addClass(element, ani_classes);
        element.classList.add("aniUtil_animating");
        element.addEventListener("animationend", () => {
          element.classList.remove("aniUtil_animating");
        });
      }
    }
    else if (isScrolledIntoView(element) === "no" ){
      if( element.classList.contains("aniUtil_active") && !element.classList.contains("aniUtil_animating")){
        if(element.classList.contains("aniUtil_dramatic")){
          element.style.opacity = "0";
        }
        removeClass(element, ani_classes);
      }
    }
  });

  //Custom Animations
  //aniCus_tubeLight
  document.querySelectorAll("*[class*='aniCus_tubeLight']:not([class*='aniUtil_onClick']):not([class*='aniUtil_onMouse']):not([class*='aniUtil_onKey']):not([class*='aniUtil_disabled'])").forEach(element => {
    //Check visibility then animate
    if (isScrolledIntoView(element) === "full" ) {
      if(!element.classList.contains("aniUtil_animating") && !element.classList.contains("animate__animated")){
        aniCus_tubeLight(element, 1);
      }
    }
    else if (isScrolledIntoView(element) === "no" ){
      if( element.classList.contains("aniUtil_active") && !element.classList.contains("aniUtil_animating")){
        if(element.classList.contains("aniUtil_dramatic")){
          element.style.opacity = "0";
        }
        removeClass(element, "animate__animated animate__fadeIn animate__slower");
      }
    }
  });

  //aniCus_OutIn
  document.querySelectorAll("*[class*=aniCus_OutIn]:not([class*='aniUtil_onClick']):not([class*='aniUtil_onMouse']):not([class*='aniUtil_onKey']):not([class*='aniUtil_disabled'])").forEach(element => {
    //Get the animation classes
    var outInClasses = get_aniOutInClasses(element);
    var aniOut_classes = outInClasses[0];
    var aniIn_classes = outInClasses[1];
    //Check visibility then animate
    if (isScrolledIntoView(element) === "full" ) {
      if(!element.classList.contains("aniUtil_animating") && !element.classList.contains("animate__animated")){
        aniCus_OutIn(element, 1, aniOut_classes, aniIn_classes);
      }
    }
    else if (isScrolledIntoView(element) === "no" ){
      if( element.classList.contains("aniUtil_active") && !element.classList.contains("aniUtil_animating")){
        if(element.classList.contains("aniUtil_dramatic")){
          element.style.opacity = "0";
        }
        removeClass(element, aniIn_classes);
      }
    }
  });
}
//click animations
function click_Animations(){
  //This function initializes the click animations
  //Ordinary animations
  document.querySelectorAll("*[class*='ani_'][class*='aniUtil_onClick']:not([class*='aniUtil_disabled'])").forEach(element => {
    //Get the animation classes
    var ani_classes = get_aniClasses(element);

    //on Click
    if(element.classList.contains("aniUtil_onClick")){
      element.addEventListener("click", function(){
        if(!element.classList.contains("aniUtil_disabled")){
          if(element.classList.contains("aniUtil_dramatic")){
            element.style.opacity = "0";
          }
          addClass(element, ani_classes);
          if(element.classList.contains("aniUtil_active")){
            this.addEventListener('animationend', () => {
              removeClass(element, ani_classes);
              if(element.classList.contains("aniUtil_dramatic")){
                element.style.opacity = "0";
              }
            });
          }
          else{
            element.classList.remove("aniUtil_onClick");
          }
        }
      });
    }
  });

  //Custom Animations
  //aniCus_clickDisabled
  //on Click
  document.querySelectorAll("*[class*='aniCus_clickDisabled']:not([class*='aniUtil_disabled'])").forEach(element => {
    element.addEventListener("click", function(){
      if(!element.classList.contains("aniUtil_disabled")){
        element.style.border = "2px solid red";
        addClass(element, "animate__animated animate__shakeX animate__faster");
        element.addEventListener('animationend', () => {
          element.style.border = "revert";
          removeClass(element, "animate__animated animate__shakeX animate__faster");
        });
      }
    });
  });

  //aniCus_tubeLight
  document.querySelectorAll("*[class*='aniCus_tubeLight'][class*='aniUtil_onClick']:not([class*='aniUtil_disabled'])").forEach(element => {
    //on Click
    if(element.classList.contains("aniUtil_onClick")){
      if(!element.classList.contains("aniUtil_animating")){
        element.addEventListener("click", function(){
          if(!element.classList.contains("aniUtil_disabled")){
            aniCus_tubeLight(element, 2);
          }
        });
      }
    }
  });

  //aniCus_OutIn
  document.querySelectorAll("*[class*=aniCus_OutIn][class*='aniUtil_onClick']:not([class*='aniUtil_disabled'])").forEach(element => {
    //Get the animation classes
    var outInClasses = get_aniOutInClasses(element);
    var aniOut_classes = outInClasses[0];
    var aniIn_classes = outInClasses[1];
    //on Click
    if(element.classList.contains("aniUtil_onClick")){
      if(!element.classList.contains("aniUtil_animating")){
        element.addEventListener("click", function(){
          if(!element.classList.contains("aniUtil_disabled")){
            aniCus_OutIn(element, 2, aniOut_classes, aniIn_classes);
          }
        });
      }
    }
  });
}

//hover animations
function hover_Animations(){
  //This function initializes the mouse over animations
  //Ordinary animations
  document.querySelectorAll("*[class*='ani_'][class*='aniUtil_onMouse']:not([class*='aniUtil_disabled'])").forEach(element => {
    //Get the animation classes
    var ani_classes = get_aniClasses(element);

    //On mouse over
    if(element.classList.contains("aniUtil_onMouse")){
      element.addEventListener("mouseover", function(){
        if(!element.classList.contains("aniUtil_disabled")){
          if(element.classList.contains("aniUtil_dramatic")){
            element.style.opacity = "100";
          }
          addClass(element, ani_classes);
          if(element.classList.contains("aniUtil_onMouseRepeat")){
            //Add repeat class
            element.classList.add("animate__infinite");
          }
          else if(element.classList.contains("aniUtil_active")){
            this.addEventListener('animationend', () => {
              removeClass(element, ani_classes);
              if(element.classList.contains("aniUtil_dramatic")){
                element.style.opacity = "0";
              }
            });
          }
          else{
            element.classList.remove("aniUtil_onMouse");
          }
        }
      });
      element.addEventListener("mouseout", function(){
        //functional requirement for aniUtil_onMouseRepeat
        if(element.classList.contains("aniUtil_onMouseRepeat")){
          element.classList.remove("animate__infinite");
          if(element.classList.contains("aniUtil_active")){
            this.addEventListener('animationend', () => {
              removeClass(element, ani_classes);
              if(element.classList.contains("aniUtil_dramatic")){
                element.style.opacity = "0";
              }
            });
          }
          else{
            element.classList.remove("aniUtil_onMouse");
            element.classList.remove("aniUtil_onMouseRepeat");
          }
        }
      });
    }
  });

  //Custom Animations
  //aniCus_tubeLight
  document.querySelectorAll("*[class*='aniCus_tubeLight'][class*='aniUtil_onMouse']:not([class*='aniUtil_disabled'])").forEach(element => {
    //On mouse over
    if(element.classList.contains("aniUtil_onMouse")){
      if(!element.classList.contains("aniUtil_animating")){
        element.addEventListener("mouseover", function(){
          if(!element.classList.contains("aniUtil_disabled")){
            aniCus_tubeLight(element, 3);
          }
        });
      }
    }
  });

  //aniCus_OutIn
  document.querySelectorAll("*[class*='aniCus_OutIn'][class*='aniUtil_onMouse']:not([class*='aniUtil_disabled'])").forEach(element => {
    //Get the animation classes
    var outInClasses = get_aniOutInClasses(element);
    var aniOut_classes = outInClasses[0];
    var aniIn_classes = outInClasses[1];
    //On mouse over
    if(element.classList.contains("aniUtil_onMouse")){
      if(!element.classList.contains("aniUtil_animating")){
        element.addEventListener("mouseover", function(){
          if(!element.classList.contains("aniUtil_disabled")){
            aniCus_OutIn(element, 3, aniOut_classes, aniIn_classes);
          }
        });
      }
    }
  });
}
//inner animations for division scroll
function inner_Animations(){
  //This function initializes the inner animations for elements inside scrollable divisions
  //On scroll of Division
  document.querySelectorAll(".aniUtil_scrollDiv").forEach(element =>{
    element.addEventListener("scroll", function() {
      var parent = this;
      document.querySelectorAll("*[class*='aniIn_']:not([class*='aniUtil_onClick']):not([class*='aniUtil_onMouse']):not([class*='aniUtil_onKey']):not([class*='aniUtil_disabled'])").forEach(element2 => {
        var ani_classes = '';
        var classname = element2.classList;
        classname.forEach(element3 =>{
          if(element3.match(/^aniIn_/)){
            var animation = element3.split("_")[1];
            ani_classes = "animate__animated animate__"+animation;
          }
        });

        //Check visibility then animate
        if (isScrolledIntoDivView(element2, parent) === true) {
          if(element2.classList.contains("aniUtil_dramatic")){
            element2.style.opacity = "100";
          }
          addClass(element2, ani_classes);
        }
        else{
          if( element2.classList.contains("aniUtil_active") ){
            if(element2.classList.contains("aniUtil_dramatic")){
              element2.style.opacity = "0";
            }
            removeClass(element2, ani_classes);
          }
        }
      });
    });
  });
}
//key press animations
function key_Animations(e){
  //This function is triggered on key up event and performance animation on desired element/s
  var elem = "*[class*='aniUtil_onKey-"+e.code+"']:not([class*='aniUtil_disabled'])";
  document.querySelectorAll(elem).forEach(element =>{
    //Custom animations
    //aniCus_tubeLight
    if(element.classList.contains("aniCus_tubeLight")){
      aniCus_tubeLight(element, 4);
    }

    //aniCus_OutIn
    else if(/aniCus_OutIn-/.test(element.className)){
      var outInClasses = get_aniOutInClasses(element);
      var aniOut_classes = outInClasses[0];
      var aniIn_classes = outInClasses[1];
      aniCus_OutIn(element, 4, aniOut_classes, aniIn_classes);
    }
    //Ordinary animations
    //Get the animation classes
    else{
      var ani_classes = get_aniClasses(element);

    if(element.classList.contains("aniUtil_dramatic")){
      element.style.opacity = "100";
    }
    addClass(element, ani_classes);
    if(element.classList.contains("aniUtil_active")){
      this.addEventListener('animationend', () => {
        removeClass(element, ani_classes);
        if(element.classList.contains("aniUtil_dramatic")){
          element.style.opacity = "0";
        }
      });
    }
    }
  })
}

//get animation class
function get_aniClasses(elem){
  //This function returns the animate.css animation classes for the element
  if((typeof elem) != "object"){
    elem = document.querySelector(elem);
  }
  var ani_classes = '';
  var classname = elem.classList;
  classname.forEach(item =>{
    if(item.match(/^ani_/)){
      var animation = item.split("_")[1];
      ani_classes = "animate__animated animate__"+animation;
    }
  });
  return ani_classes;
}

//get out and in animation Classes
function get_aniOutInClasses(elem){
  //This function returns the animate.css animation classes for the element having custom animation aniCus_OutIn
  var aniOut_classes = '';
  var aniIn_classes = '';
  var classname = elem.classList;
  classname.forEach(element =>{
    if(element.match(/^aniCus_OutIn/)){
      aniOut_classes = "animate__animated animate__"+element.split("-")[1];
      aniIn_classes = "animate__animated animate__"+element.split("-")[2];
    }
  });
  return [aniOut_classes, aniIn_classes];
}

//Check if element is scrolled into view
function isScrolledIntoView(elem) {
  //This function tells whether the element is visible on view
  var rect = elem.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;
  //Completely visible
  if((elemTop >= 0 && elemBottom <= window.innerHeight)) return "full";
  //Partially visible
  else if((elemTop < window.innerHeight && elemBottom >= 0)) return "partial";
  //Not visible
  else return "no";
}

//Check if element is scrolled into division view
function isScrolledIntoDivView(elem, parent) {
  //This function tells whether the element inside some scrollable division is visible on view
  const elemrect = elem.getBoundingClientRect();
  const parentrect  = parent.getBoundingClientRect();
  var parentTop = parentrect.top;
  var parentBottom = parentrect.bottom;

  var elemTop = elemrect.top;
  var elemBottom = elemrect.bottom;

  //Completely visible
  return ((elemBottom <= parentBottom) && (elemTop >= parentTop));
}

//Custom animation function definitions
//aniCus_tubeLight
function aniCus_tubeLight(elem, type){
  //This function is for custom animation aniCus_tubeLight
  //For click, mouse, and key press animations
  if( type  == 2 || type == 3 || type == 4){
    if(!elem.classList.contains("animate__animated") && !elem.classList.contains("aniUtil_animating")){
      if(elem.classList.contains("aniUtil_dramatic")){
        elem.style.opacity = "100";
      }
      addClass(elem, "animate__animated animate__flash animate__repeat-2 animate__faster");
      elem.classList.add("aniUtil_animating");
      elem.addEventListener('animationend', () => {
        removeClass(elem, "animate__animated animate__flash animate__repeat-2 animate__faster");
        addClass(elem, "animate__animated animate__fadeOut animate__slow");
        elem.addEventListener("animationend", () => {
          removeClass(elem, "animate__animated animate__fadeOut animate__slow");
          addClass(elem, "animate__animated animate__flash animate__faster");
          elem.addEventListener("animationend", () => {
            removeClass(elem, "animate__animated animate__flash animate__faster");
            addClass(elem, "animate__animated animate__fadeIn animate__slower");
            elem.addEventListener('animationend', () => {
              if(elem.classList.contains("aniUtil_active")){
                removeClass(elem, "animate__animated animate__fadeIn animate__slower");
              }
              else{
                if( type == 2) elem.classList.remove("aniUtil_onClick");
                else if( type == 3) elem.classList.remove("aniUtil_onMouse");
              }
            });
          });
        });
      });
      elem.classList.remove("aniUtil_animating");
    }
  }
  //For ordinary animations
  else if( type == 1 ){
    if(!elem.classList.contains("animate__animated") && !elem.classList.contains("aniUtil_animating")){
      if(elem.classList.contains("aniUtil_dramatic")){
        elem.style.opacity = "100";
      }
      addClass(elem, "animate__animated animate__flash animate__repeat-2 animate__faster");
      elem.classList.add("aniUtil_animating");
      elem.addEventListener('animationend', () => {
        removeClass(elem, "animate__animated animate__flash animate__repeat-2 animate__faster");
        addClass(elem, "animate__animated animate__fadeOut animate__slow");
        elem.addEventListener("animationend", () => {
          removeClass(elem, "animate__animated animate__fadeOut animate__slow");
          addClass(elem, "animate__animated animate__flash animate__faster");
          elem.addEventListener("animationend", () => {
            removeClass(elem, "animate__animated animate__flash animate__faster");
            addClass(elem, "animate__animated animate__fadeIn animate__slower");
          });
        });
      });
      elem.classList.remove("aniUtil_animating");
    }
  }
}

//aniCus_OutIn
function aniCus_OutIn(elem, type, aniOut_classes, aniIn_classes){
  //This function is for custom animation aniCus_OutIn
  //For click, mouse, and key press animations
  if( type  == 2 || type == 3 || type == 4){
    if(!elem.classList.contains("animate__animated") && !elem.classList.contains("aniUtil_animating")){
      if(elem.classList.contains("aniUtil_dramatic")){
        elem.style.opacity = "100";
      }
      addClass(elem, aniOut_classes);
      elem.classList.add("aniUtil_animating");
      elem.addEventListener('animationend', () => {
        removeClass(elem, aniOut_classes);
        addClass(elem, aniIn_classes);
        elem.addEventListener("animationend", () => {
          elem.classList.remove("aniUtil_animating");
          if(elem.classList.contains("aniUtil_active")){
            removeClass(elem, aniIn_classes);
          }
          else{
            if( type == 2) elem.classList.remove("aniUtil_onClick");
            else if( type == 3) elem.classList.remove("aniUtil_onMouse");
          }
        });
      });
    }
  }
  //For ordinary animations
  else if( type == 1 ){
    if(!elem.classList.contains("animate__animated") && !elem.classList.contains("aniUtil_animating")){
      if(elem.classList.contains("aniUtil_dramatic")){
        elem.style.opacity = "100";
      }
      addClass(elem, aniOut_classes);
      elem.classList.add("aniUtil_animating");
      elem.addEventListener('animationend', () => {
        removeClass(elem, aniOut_classes);
        addClass(elem, aniIn_classes);
        elem.addEventListener('animationend', () =>{
          elem.classList.remove("aniUtil_animating");
        });
      });
    }
  }
}

//aniCus_text
function aniCus_text(){
  //This function is for custom animation aniCus_text

  document.querySelectorAll("*[class*='aniCus_text']").forEach(element =>{
    var textWrapper = element;
    var ani_classes = '';
    var classname = textWrapper.classList;
    classname.forEach(item =>{
      if(item.match(/^aniCus_text/)){
        var animation = item.split("-")[1];
        ani_classes = "ani_"+animation;
      }
    });
    //add utility classes for each letter
    if(element.classList.contains("aniUtil_dramatic")) {
      ani_classes = ani_classes+" aniUtil_dramatic";
      element.classList.remove("aniUtil_dramatic");
    }
    if(element.classList.contains("aniUtil_active")) ani_classes = ani_classes+" aniUtil_active";
    if(element.classList.contains("aniUtil_onClick")) ani_classes = ani_classes+" aniUtil_onClick";
    if(element.classList.contains("aniUtil_onMouse")) ani_classes = ani_classes+" aniUtil_onMouse";
    //Wrap every letter in a span
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, (match, offset) => `<span class='`+ani_classes+` aniUtil_letter-${offset}'>${match}</span>`);
  })
  //Finding animation delay for each letter
  document.querySelectorAll("*[class*='aniUtil_letter']").forEach(element =>{
    var letter = element;
    var delay = 0;
    var classname = letter.classList;
    classname.forEach(item =>{
      if(item.match(/^aniUtil_letter/)){
        var offset = item.split("-")[1];
        delay = parseInt(offset)/10;
        delay = delay+"s";
      }
    });
    //No delay for click and hover animations
    if(element.classList.contains("aniUtil_onClick") || element.classList.contains("aniUtil_onMouse")) delay= '';
    //Declaring as inline block element, refer animate.css library gotchas
    element.style.display="inline-block";
    //Adding animation delay
    element.style.animationDelay = delay;
  })
}

/* -----Utility Functions----- */
//aniUtil_disable()
function aniUtil_disable(which){
  //This function disables the animations on page
  //all animations
  if(which == "all"){
    document.querySelectorAll("*[class*='ani_']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='aniIn_']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='aniCus_']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
  }
  //custom animations
  else if(which == "custom"){
    document.querySelectorAll("*[class*='aniCus_']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
  }
  //attention seekers
  else if(which == "seekers"){
    document.querySelectorAll("*[class*='ani_bounce']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_flash']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_pulse']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_rubberBand']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_shakeX']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_shakeY']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_headShake']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_swing']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_tada']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_wobble']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_jello']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_heartBeat']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
  }
  //special
  else if(which == "specials"){
    document.querySelectorAll("*[class*='ani_hinge']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_jackInTheBox']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_rollIn']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_rollOut']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
  }
  //all other
  else{
    var ani_Class = "ani_"+which;
    document.querySelectorAll("*[class*='"+ani_Class+"']").forEach(element => {
      element.classList.add("aniUtil_disabled");
    });
  }
  //Re-initializing dramatic animations
  aniUtil_dramatic();
}

//aniUtil_enable()
function aniUtil_enable(which){
  //This function enable the animations on page
  //all animations
  if(which == "all"){
    document.querySelectorAll("*[class*='ani_']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='aniIn_']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='aniCus_']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
  }
  //custom animations
  else if(which == "custom"){
    document.querySelectorAll("*[class*='aniCus_']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
  }
  //attention seekers
  else if(which == "seekers"){
    document.querySelectorAll("*[class*='ani_bounce']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_flash']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_pulse']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_rubberBand']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_shakeX']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_shakeY']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_headShake']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_swing']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_tada']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_wobble']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_jello']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_heartBeat']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
  }
  //special
  else if(which == "specials"){
    document.querySelectorAll("*[class*='ani_hinge']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_jackInTheBox']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_rollIn']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
    document.querySelectorAll("*[class*='ani_rollOut']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
  }
  //all other
  else{
    var ani_Class = "ani_"+which;
    document.querySelectorAll("*[class*='"+ani_Class+"']").forEach(element => {
      element.classList.remove("aniUtil_disabled");
    });
  }
  //Re-initializing dramatic animations
  aniUtil_dramatic();
}

//aniUtil_animate()
function aniUtil_animate(elem, ani_Class){
  //This function animates an element with the animations provided
  if((typeof elem) != "object"){
    elem = document.querySelector(elem);
  }
  if(elem.classList.contains('aniUtil_disabled')){
    elem.classList.remove('aniUtil_disabled');
  }
  addClass(elem, ani_Class);
  if(!elem.classList.contains("aniUtil_onClick") && !elem.classList.contains("aniUtil_onMouse"))
  view_Animations();
  if(elem.classList.contains("aniUtil_onClick"))
  click_Animations();
  if(elem.classList.contains("aniUtil_onMouse"))
  hover_Animations();
}

//aniUtil_inanimate()
function aniUtil_inanimate(elem){
  //This function inanimates/disables the animation for a perticular element
  if((typeof elem) != "object"){
    elem = document.querySelector(elem);
  }
  elem.classList.add('aniUtil_disabled');
}

//aniUtil_reset()
function aniUtil_reset(elem){
  //This function resets the animation for a perticular element
  if((typeof elem) != "object"){
    elem = document.querySelector(elem);
  }
  removeClass(elem, get_aniClasses(elem));
  if(!elem.classList.contains("aniUtil_onMouse") && !elem.classList.contains("aniUtil_onClick") && !elem.classList.contains('/^aniCus_onKey/'))
  view_Animations();
}

//aniUtil_flush
function aniUtil_flush(elem){
  //This function flushes the animation classes for a particular element
  if((typeof elem) != "object"){
    elem = document.querySelector(elem);
  }
  removeClass(elem, get_aniClasses(elem));
  elem.classList.remove("ani_"+get_aniClasses(elem).split("__")[2]);
}

function addClass(elem, string){
  if((typeof elem) != "object"){
    elem = document.querySelector(elem);
  }
  classList = string.split(" ");
  classList.forEach(item => {
    elem.classList.add(item);
  })
}

function removeClass(elem, string){
  if((typeof elem) != "object"){
    elem = document.querySelector(elem);
  }
  classList = string.split(" ");
  classList.forEach(item => {
    elem.classList.remove(item);
  })
}
