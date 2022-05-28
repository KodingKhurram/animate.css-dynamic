/*
 * animate.js - animate-dynamic.ga
 * Version - v2.16.7
 * Licensed under the MIT license - https://opensource.org/licenses/MIT

 * Copyright (c) 2021 Mohammed Khurram (KodingKhurram)
 */

$(window).on("load", function() {
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
$(window).scroll(function() {
  view_Animations();
});

//On KeyPress
$(document).keyup(function(e){
  key_Animations(e);
});

/* -----Function definitions----- */
//aniUtil_dramatic
function aniUtil_dramatic(){
  //This function initializes element for dramatic animations
  $(".aniUtil_dramatic").each(function() {
    $(this).css("opacity", 100);
    if(!$(this).hasClass("aniUtil_disabled") && !$(this).hasClass("animate__animated")){
      $(this).css("opacity", 0);
    }
  });
}
//view animations
function view_Animations(){
  //This function initializes the scroll animations
  //Ordinary animations
  $("*[class*='ani_']:not([class*='aniUtil_onClick']):not([class*='aniUtil_onMouse']):not([class*='aniUtil_onKey']):not([class*='aniUtil_disabled'])").each(function() {
    //Get the animation classes
    var ani_classes = get_aniClasses(this);

    //Check visibility then animate
    if (isScrolledIntoView(this) === true ) {
      if(!$(this).hasClass("aniUtil_animating") && !$(this).hasClass("animate__animated")){
        if($(this).hasClass("aniUtil_dramatic")){
          $(this).css("opacity", 100);
        }
        $(this).addClass(ani_classes);
        $(this).addClass("aniUtil_animating");
        this.addEventListener("animationend", () => {
          $(this).removeClass("aniUtil_animating");
        });
      }
    }
    else{
      if( $(this).hasClass("aniUtil_active") && !$(this).hasClass("aniUtil_animating")){
        if($(this).hasClass("aniUtil_dramatic") && isScrolledOutOfView(this)){
          $(this).css("opacity", 0);
        }
        $(this).removeClass(ani_classes);
      }
    }
  });

  //Custom Animations
  //aniCus_tubeLight
  $("*[class*='aniCus_tubeLight']:not([class*='aniUtil_onClick']):not([class*='aniUtil_onMouse']):not([class*='aniUtil_onKey']):not([class*='aniUtil_disabled'])").each(function() {
    //Check visibility then animate
    if (isScrolledIntoView(this) === true ) {
      if(!$(this).hasClass("aniUtil_animating") && !$(this).hasClass("animate__animated")){
        aniCus_tubeLight(this, 1);
      }
    }
    else{
      if( $(this).hasClass("aniUtil_active") && !$(this).hasClass("aniUtil_animating")){
        if($(this).hasClass("aniUtil_dramatic")){
          $(this).css("opacity", 0);
        }
        $(this).removeClass("animate__animated animate__fadeIn animate__slower");
      }
    }
  });

  //aniCus_OutIn
  $("*[class*='aniCus_OutIn']:not([class*='aniUtil_onClick']):not([class*='aniUtil_onMouse']):not([class*='aniUtil_onKey']):not([class*='aniUtil_disabled'])").each(function() {
    //Get the animation classes
    var outInClasses = get_aniOutInClasses(this);
    var aniOut_classes = outInClasses[0];
    var aniIn_classes = outInClasses[1];
    //Check visibility then animate
    if (isScrolledIntoView(this) === true ) {
      if(!$(this).hasClass("aniUtil_animating") && !$(this).hasClass("animate__animated")){
        aniCus_OutIn(this, 1, aniOut_classes, aniIn_classes);
      }
    }
    else{
      if( $(this).hasClass("aniUtil_active") && !$(this).hasClass("aniUtil_animating")){
        if($(this).hasClass("aniUtil_dramatic")){
          $(this).css("opacity", 0);
        }
        $(this).removeClass(aniIn_classes);
      }
    }
  });
}
//click animations
function click_Animations(){
  //This function initializes the click animations
  //Ordinary animations
  $("*[class*='ani_'][class*='aniUtil_onClick']:not([class*='aniUtil_disabled'])").each(function() {
    //Get the animation classes
    var ani_classes = get_aniClasses(this);

    //on Click
    if($(this).hasClass("aniUtil_onClick")){
      $(this).click(function(){
        if(!$(this).hasClass("aniUtil_disabled")){
          if($(this).hasClass("aniUtil_dramatic")){
            $(this).css("opacity", 100);
          }
          $(this).addClass(ani_classes);
          if($(this).hasClass("aniUtil_active")){
            this.addEventListener('animationend', () => {
              $(this).removeClass(ani_classes);
              if($(this).hasClass("aniUtil_dramatic")){
                $(this).css("opacity", 0);
              }
            });
          }
          else{
            $(this).removeClass("aniUtil_onClick");
          }
        }
      });
    }
  });

  //Custom Animations
  //aniCus_clickDisabled
  //on Click
  $("*[class*='aniCus_clickDisabled']:not([class*='aniUtil_disabled'])").each(function() {
    $(this).click(function(){
      if(!$(this).hasClass("aniUtil_disabled")){
        $(this).attr('style', 'border: 2px solid red !important');
        $(this).addClass("animate__animated animate__shakeX animate__faster");
        this.addEventListener('animationend', () => {
          $(this).css({"border": "revert"});
          $(this).removeClass("animate__animated animate__shakeX animate__faster");
        });
      }
    });
  });

  //aniCus_tubeLight
  $("*[class*='aniCus_tubeLight'][class*='aniUtil_onClick']:not([class*='aniUtil_disabled'])").each(function() {
    //on Click
    if($(this).hasClass("aniUtil_onClick")){
      if(!$(this).hasClass("aniUtil_animating")){
        $(this).click(function(){
          if(!$(this).hasClass("aniUtil_disabled")){
            aniCus_tubeLight(this, 2);
          }
        });
      }
    }
  });

  //aniCus_OutIn
  $("*[class*='aniCus_OutIn'][class*='aniUtil_onClick']:not([class*='aniUtil_disabled'])").each(function() {
    //Get the animation classes
    var outInClasses = get_aniOutInClasses(this);
    var aniOut_classes = outInClasses[0];
    var aniIn_classes = outInClasses[1];
    //on Click
    if($(this).hasClass("aniUtil_onClick")){
      if(!$(this).hasClass("aniUtil_animating")){
        $(this).click(function(){
          if(!$(this).hasClass("aniUtil_disabled")){
            aniCus_OutIn(this, 2, aniOut_classes, aniIn_classes);
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
  $("*[class*='ani_'][class*='aniUtil_onMouse']:not([class*='aniUtil_disabled'])").each(function() {
    //Get the animation classes
    var ani_classes = get_aniClasses(this);

    //On mouse over
    if($(this).hasClass("aniUtil_onMouse")){
      $(this).mouseover(function(){
        if(!$(this).hasClass("aniUtil_disabled")){
          if($(this).hasClass("aniUtil_dramatic")){
            $(this).css("opacity", 100);
          }
          $(this).addClass(ani_classes);
          if($(this).hasClass("aniUtil_onMouseRepeat")){
            //Add repeat class
            $(this).addClass("animate__infinite");
          }
          else if($(this).hasClass("aniUtil_active")){
            this.addEventListener('animationend', () => {
              $(this).removeClass(ani_classes);
              if($(this).hasClass("aniUtil_dramatic")){
                $(this).css("opacity", 0);
              }
            });
          }
          else{
            $(this).removeClass("aniUtil_onMouse");
          }
        }
      });
      $(this).mouseout(function(){
        //functional requirement for aniUtil_onMouseRepeat
        if($(this).hasClass("aniUtil_onMouseRepeat")){
          $(this).removeClass("animate__infinite");
          if($(this).hasClass("aniUtil_active")){
            this.addEventListener('animationend', () => {
              $(this).removeClass(ani_classes);
              if($(this).hasClass("aniUtil_dramatic")){
                $(this).css("opacity", 0);
              }
            });
          }
          else{
            $(this).removeClass("aniUtil_onMouse");
            $(this).removeClass("aniUtil_onMouseRepeat");
          }
        }
      });
    }
  });

  //Custom Animations
  //aniCus_tubeLight
  $("*[class*='aniCus_tubeLight'][class*='aniUtil_onMouse']:not([class*='aniUtil_disabled'])").each(function() {
    //On mouse over
    if($(this).hasClass("aniUtil_onMouse")){
      if(!$(this).hasClass("aniUtil_animating")){
        $(this).mouseover(function(){
          if(!$(this).hasClass("aniUtil_disabled")){
            aniCus_tubeLight(this, 3);
          }
        });
      }
    }
  });

  //aniCus_OutIn
  $("*[class*='aniCus_OutIn'][class*='aniUtil_onMouse']:not([class*='aniUtil_disabled'])").each(function() {
    //Get the animation classes
    var outInClasses = get_aniOutInClasses(this);
    var aniOut_classes = outInClasses[0];
    var aniIn_classes = outInClasses[1];
    //On mouse over
    if($(this).hasClass("aniUtil_onMouse")){
      if(!$(this).hasClass("aniUtil_animating")){
        $(this).mouseover(function(){
          if(!$(this).hasClass("aniUtil_disabled")){
            aniCus_OutIn(this, 3, aniOut_classes, aniIn_classes);
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
  $(".aniUtil_scrollDiv").each(function(){
    $(this).scroll(function() {
      var parent = this;
      $("*[class*='aniIn_']:not([class*='aniUtil_onClick']):not([class*='aniUtil_onMouse']):not([class*='aniUtil_onKey']):not([class*='aniUtil_disabled'])").each(function() {
        var ani_classes = '';
        var classname = this.classList;
        $(classname).each(function(){
          if(this.match(/^aniIn_/)){
            var animation = this.split("_")[1];
            ani_classes = "animate__animated animate__"+animation;
          }
        });

        //Check visibility then animate
        if (isScrolledIntoDivView(this, parent) === true) {
          if($(this).hasClass("aniUtil_dramatic")){
            $(this).css("opacity", 100);
          }
          $(this).addClass(ani_classes);
        }
        else{
          if( $(this).hasClass("aniUtil_active") ){
            if($(this).hasClass("aniUtil_dramatic")){
              $(this).css("opacity", 0);
            }
            $(this).removeClass(ani_classes);
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
  $(elem).each(function(){
    //Ordinary animations
    //Get the animation classes
    var ani_classes = get_aniClasses(this);

    if($(this).hasClass("aniUtil_dramatic")){
      $(this).css("opacity", 100);
    }
    $(this).addClass(ani_classes);
    if($(this).hasClass("aniUtil_active")){
      this.addEventListener('animationend', () => {
        $(this).removeClass(ani_classes);
        if($(this).hasClass("aniUtil_dramatic")){
          $(this).css("opacity", 0);
        }
      });
    }

    //Custom animations
    //aniCus_tubeLight
    if($(this).hasClass("aniCus_tubeLight")){
      aniCus_tubeLight(this, 4);
    }

    //aniCus_OutIn
    if($(this).is('[class*="aniCus_OutIn"]')){
      var outInClasses = get_aniOutInClasses(this);
      var aniOut_classes = outInClasses[0];
      var aniIn_classes = outInClasses[1];
      aniCus_OutIn(this, 4, aniOut_classes, aniIn_classes);
    }
  })
}

//get animation class
function get_aniClasses(elem){
  //This function returns the animate.css animation classes for the element
  elem = $(elem)[0];
  var ani_classes = '';
  var classname = elem.classList;
  $(classname).each(function(){
    if(this.match(/^ani_/)){
      var animation = this.split("_")[1];
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
  $(classname).each(function(){
    if(this.match(/^aniCus_OutIn/)){
      aniOut_classes = "animate__animated animate__"+this.split("-")[1];
      aniIn_classes = "animate__animated animate__"+this.split("-")[2];
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
  return ((elemTop >= 0) && (elemBottom <= window.innerHeight));
}

//Check if element is scrolled out of view
function isScrolledOutOfView(elem) {
  //This function tells whether the element is out of view
  var rect = elem.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;
  //Completely out of view
  return ((elemTop >= window.innerHeight) || (elemBottom <= 0));
}

//Check if element is scrolled into division view
function isScrolledIntoDivView(elem, parent) {
  //This function tells whether the element inside some scrollable division is visible on view
  var parentTop = $(parent).offset().top;
  var parentBottom = parentTop + $(parent).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();
  //Completely visible
  return ((elemBottom <= parentBottom) && (elemTop >= parentTop));
}

//Custom animation function definitions
//aniCus_tubeLight
function aniCus_tubeLight(elem, type){
  //This function is for custom animation aniCus_tubeLight
  //For click, mouse, and key press animations
  if( type  == 2 || type == 3 || type == 4){
    if(!$(elem).hasClass("animate__animated") && !$(elem).hasClass("aniUtil_animating")){
      if($(elem).hasClass("aniUtil_dramatic")){
        $(elem).css("opacity", 100);
      }
      $(elem).addClass("animate__animated animate__flash animate__repeat-2 animate__faster");
      $(elem).addClass("aniUtil_animating");
      elem.addEventListener('animationend', () => {
        $(elem).removeClass("animate__animated animate__flash animate__repeat-2 animate__faster");
        $(elem).addClass("animate__animated animate__fadeOut animate__slow");
        elem.addEventListener("animationend", () => {
          $(elem).removeClass("animate__animated animate__fadeOut animate__slow");
          $(elem).addClass("animate__animated animate__flash animate__faster");
          elem.addEventListener("animationend", () => {
            $(elem).removeClass("animate__animated animate__flash animate__faster");
            $(elem).addClass("animate__animated animate__fadeIn animate__slower");
            elem.addEventListener('animationend', () => {
              if($(elem).hasClass("aniUtil_active")){
                $(elem).removeClass("animate__animated animate__fadeIn animate__slower");
              }
              else{
                if( type == 2) $(elem).removeClass("aniUtil_onClick");
                else if( type == 3) $(elem).removeClass("aniUtil_onMouse");
              }
            });
          });
        });
      });
      $(elem).removeClass("aniUtil_animating");
    }
  }
  //For ordinary animations
  else if( type == 1 ){
    if(!$(elem).hasClass("animate__animated") && !$(elem).hasClass("aniUtil_animating")){
      if($(elem).hasClass("aniUtil_dramatic")){
        $(elem).css("opacity", 100);
      }
      $(elem).addClass("animate__animated animate__flash animate__repeat-2 animate__faster");
      $(elem).addClass("aniUtil_animating");
      elem.addEventListener('animationend', () => {
        $(elem).removeClass("animate__animated animate__flash animate__repeat-2 animate__faster");
        $(elem).addClass("animate__animated animate__fadeOut animate__slow");
        elem.addEventListener("animationend", () => {
          $(elem).removeClass("animate__animated animate__fadeOut animate__slow");
          $(elem).addClass("animate__animated animate__flash animate__faster");
          elem.addEventListener("animationend", () => {
            $(elem).removeClass("animate__animated animate__flash animate__faster");
            $(elem).addClass("animate__animated animate__fadeIn animate__slower");
          });
        });
      });
      $(elem).removeClass("aniUtil_animating");
    }
  }
}

//aniCus_OutIn
function aniCus_OutIn(elem, type, aniOut_classes, aniIn_classes){
  //This function is for custom animation aniCus_OutIn
  //For click, mouse, and key press animations
  if( type  == 2 || type == 3 || type == 4){
    if(!$(elem).hasClass("animate__animated") && !$(elem).hasClass("aniUtil_animating")){
      if($(elem).hasClass("aniUtil_dramatic")){
        $(elem).css("opacity", 100);
      }
      $(elem).addClass(aniOut_classes);
      $(elem).addClass("aniUtil_animating");
      elem.addEventListener('animationend', () => {
        $(elem).removeClass(aniOut_classes);
        $(elem).addClass(aniIn_classes);
        elem.addEventListener("animationend", () => {
          $(elem).removeClass("aniUtil_animating");
          if($(elem).hasClass("aniUtil_active")){
            $(elem).removeClass(aniIn_classes);
          }
          else{
            if( type == 2) $(elem).removeClass("aniUtil_onClick");
            else if( type == 3) $(elem).removeClass("aniUtil_onMouse");
          }
        });
      });
    }
  }
  //For ordinary animations
  else if( type == 1 ){
    if(!$(elem).hasClass("animate__animated") && !$(elem).hasClass("aniUtil_animating")){
      if($(elem).hasClass("aniUtil_dramatic")){
        $(elem).css("opacity", 100);
      }
      $(elem).addClass(aniOut_classes);
      $(elem).addClass("aniUtil_animating");
      elem.addEventListener('animationend', () => {
        $(elem).removeClass(aniOut_classes);
        $(elem).addClass(aniIn_classes);
        elem.addEventListener('animationend', () =>{
          $(elem).removeClass("aniUtil_animating");
        });
      });
    }
  }
}

//aniCus_text
function aniCus_text(){
  //This function is for custom animation aniCus_text

  $("*[class*='aniCus_text']").each(function(){
    var textWrapper = this;
    var ani_classes = '';
    var classname = textWrapper.classList;
    $(classname).each(function(){
      if(this.match(/^aniCus_text/)){
        var animation = this.split("-")[1];
        ani_classes = "ani_"+animation;
      }
    });
    //add utility classes for each letter
    if($(this).hasClass("aniUtil_dramatic")) {
      ani_classes = ani_classes+" aniUtil_dramatic";
      $(this).removeClass("aniUtil_dramatic");
    }
    if($(this).hasClass("aniUtil_active")) ani_classes = ani_classes+" aniUtil_active";
    if($(this).hasClass("aniUtil_onClick")) ani_classes = ani_classes+" aniUtil_onClick";
    if($(this).hasClass("aniUtil_onMouse")) ani_classes = ani_classes+" aniUtil_onMouse";
    //Wrap every letter in a span
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, (match, offset) => `<span class='`+ani_classes+` aniUtil_letter-${offset}'>${match}</span>`);
  })
  //Finding animation delay for each letter
  $("*[class*='aniUtil_letter']").each(function(){
    var letter = this;
    var delay = 0;
    var classname = letter.classList;
    $(classname).each(function(){
      if(this.match(/^aniUtil_letter/)){
        var offset = this.split("-")[1];
        delay = parseInt(offset)/10;
        delay = delay+"s";
      }
    });
    //No delay for click and hover animations
    if($(this).hasClass("aniUtil_onClick") || $(this).hasClass("aniUtil_onMouse")) delay= '';
    //Declaring as inline block element, refer animate.css library gotchas
    this.style.display="inline-block";
    //Adding animation delay
    this.style.animationDelay = delay;
  })
}

/* -----Utility Functions----- */
//aniUtil_disable()
function aniUtil_disable(which){
  //This function disables the animations on page
  //all animations
  if(which == "all"){
    $("*[class*='ani_']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
    $("*[class*='aniIn_']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
    $("*[class*='aniCus_']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
  }
  //custom animations
  else if(which == "custom"){
    $("*[class*='aniCus_']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
  }
  //attention seekers
  else if(which == "seekers"){
    $("*[class*='ani_bounce']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
    $("*[class*='ani_flash']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
    $("*[class*='ani_pulse']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
    $("*[class*='ani_rubberBand']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
    $("*[class*='ani_shakeX']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
    $("*[class*='ani_shakeY']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
    $("*[class*='ani_headShake']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
    $("*[class*='ani_swing']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
    $("*[class*='ani_tada']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
    $("*[class*='ani_wobble']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
    $("*[class*='ani_jello']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
    $("*[class*='ani_heartBeat']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
  }
  //special
  else if(which == "specials"){
    $("*[class*='ani_hinge']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
    $("*[class*='ani_jackInTheBox']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
    $("*[class*='ani_rollIn']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
    $("*[class*='ani_rollOut']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
  }
  //all other
  else{
    var ani_Class = "ani_"+which;
    $("*[class*='"+ani_Class+"']").each(function() {
      $(this).addClass("aniUtil_disabled");
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
    $("*[class*='ani_']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
    $("*[class*='aniIn_']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
    $("*[class*='aniCus_']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
  }
  //custom animations
  else if(which == "custom"){
    $("*[class*='aniCus_']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
  }
  //attention seekers
  else if(which == "seekers"){
    $("*[class*='ani_bounce']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
    $("*[class*='ani_flash']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
    $("*[class*='ani_pulse']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
    $("*[class*='ani_rubberBand']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
    $("*[class*='ani_shakeX']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
    $("*[class*='ani_shakeY']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
    $("*[class*='ani_headShake']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
    $("*[class*='ani_swing']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
    $("*[class*='ani_tada']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
    $("*[class*='ani_wobble']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
    $("*[class*='ani_jello']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
    $("*[class*='ani_heartBeat']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
  }
  //special
  else if(which == "specials"){
    $("*[class*='ani_hinge']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
    $("*[class*='ani_jackInTheBox']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
    $("*[class*='ani_rollIn']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
    $("*[class*='ani_rollOut']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
  }
  //all other
  else{
    var ani_Class = "ani_"+which;
    $("*[class*='"+ani_Class+"']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
  }
  //Re-initializing dramatic animations
  aniUtil_dramatic();
}

//aniUtil_animate()
function aniUtil_animate(elem, ani_Class){
  //This function animates an element with the animations provided
  if($(elem).hasClass('aniUtil_disabled')){
    $(elem).removeClass('aniUtil_disabled');
  }
  $(elem).addClass(ani_Class);
  if(!$(elem).hasClass("aniUtil_onClick") && !$(elem).hasClass("aniUtil_onMouse"))
  view_Animations();
  if($(elem).hasClass("aniUtil_onClick"))
  click_Animations();
  if($(elem).hasClass("aniUtil_onMouse"))
  hover_Animations();
}

//aniUtil_inanimate()
function aniUtil_inanimate(elem){
  //This function inanimates/disables the animation for a perticular element
  $(elem).addClass('aniUtil_disabled');
}

//aniUtil_reset()
function aniUtil_reset(elem){
  //This function resets the animation for a perticular element
  var reset_classes = get_aniClasses(elem);
  $(elem).removeClass(reset_classes);
  if(!$(elem).hasClass("aniUtil_onMouse") && !$(elem).hasClass("aniUtil_onClick") && !$(elem).is('[class*="aniCus_onKey"]'))
  view_Animations();
}
