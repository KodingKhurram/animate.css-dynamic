/*
 * animate.js - animate-dynamic.ga
 * Version - v2.9.2
 * Licensed under the MIT license - https://opensource.org/licenses/MIT

 * Copyright (c) 2021 Mohammed Khurram (KodingKhurram)
 */

$(window).on("load", function() {
  //Dramatic animations, initialization
  $(".aniUtil_dramatic").each(function() {
    if(!$(this).hasClass("aniUtil_disabled") && !$(this).hasClass("animate__animated")){
      $(this).css("opacity", 0);
    }
  });
  view_Animations();
  click_Animations();
  hover_Animations();
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
//view animations
function view_Animations(){
  //Ordinary animations
  $("*[class*='ani_']:not([class*='aniUtil_onClick']):not([class*='aniUtil_onMouse']):not([class*='aniUtil_onKey']):not([class*='aniUtil_disabled'])").each(function() {
    var ani_classes = get_aniClasses(this);

    //Check visibility
    if (isScrolledIntoView(this) === true ) {
      if(!$(this).hasClass("aniUtil_animating") && !$(this).hasClass("animate__animated")){
        if($(this).hasClass("aniUtil_dramatic")){
          $(this).css("opacity", 100);
        }
        $(this).addClass("aniUtil_animating");
        $(this).addClass(ani_classes);
        this.addEventListener("animationend", () => {
          $(this).removeClass("aniUtil_animating");
        });
      }
    }
    else{
      if( $(this).hasClass("aniUtil_active") && !$(this).hasClass("aniUtil_animating")){
        if($(this).hasClass("aniUtil_dramatic")){
          $(this).css("opacity", 0);
        }
        $(this).removeClass(ani_classes);
      }
    }
  });

  //Custom Animations
  //aniCus_tubeLight
  $("*[class*='aniCus_tubeLight']:not([class*='aniUtil_onClick']):not([class*='aniUtil_onMouse']):not([class*='aniUtil_onKey']):not([class*='aniUtil_disabled'])").each(function() {
    //Check visibility
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
    var outInClasses = get_aniOutInClasses(this);
    var aniOut_classes = outInClasses[0];
    var aniIn_classes = outInClasses[1];
    //Check visibility
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
//click and hover animations
function click_Animations(){
  //Ordinary animations
  $("*[class*='ani_'][class*='aniUtil_onClick']:not([class*='aniUtil_disabled'])").each(function() {
    var ani_classes = get_aniClasses(this);

    //on Click
    if($(this).hasClass("aniUtil_onClick")){
      $(this).click(function(){
        if($(this).hasClass("aniUtil_dramatic")){
          $(this).css("opacity", 100);
        }
        $(this).addClass(ani_classes);
        if($(this).hasClass("aniUtil_active")){
          this.addEventListener('animationend', () => {
            $(this).removeClass(ani_classes);
          });
        }
        else{
          $(this).removeClass("aniUtil_onClick");
        }
      });
    }
  });

  //Custom Animations
  //aniCus_clickDisabled
  //on Click
  $("*[class*='aniCus_clickDisabled']:not([class*='aniUtil_disabled'])").each(function() {
    $(this).click(function(){
      if($(this).hasClass("aniCus_clickDisabled") && (!$(this).hasClass("aniUtil_disabled"))){
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
  //Ordinary animations
  $("*[class*='ani_'][class*='aniUtil_onMouse']:not([class*='aniUtil_disabled'])").each(function() {
    var ani_classes = get_aniClasses(this);

    //On mouse over
    if($(this).hasClass("aniUtil_onMouse")){
      $(this).mouseover(function(){
        if(!$(this).hasClass("aniUtil_disabled")){
          if($(this).hasClass("aniUtil_dramatic")){
            $(this).css("opacity", 100);
          }
          $(this).addClass(ani_classes);
          if($(this).hasClass("aniUtil_active")){
            this.addEventListener('animationend', () => {
              $(this).removeClass(ani_classes);
            });
          }
          else{
            $(this).removeClass("aniUtil_onMouse");
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
  //On scroll of Division
  $(".aniUtil_scrollDiv").each(function(){
    $(this).scroll(function() {
      var parent = this;
      $("*[class*='aniIn_']:not([class*='aniUtil_onClick']):not([class*='aniUtil_onMouse']):not([class*='aniUtil_onKey']):not([class*='aniUtil_disabled'])").each(function() {
        var ani_classes = "";
        var classname = this.classList;
        $(classname).each(function(){
          if(this.match(/^aniIn_/)){
            var animation = this.split("_")[1];
            ani_classes = "animate__animated animate__"+animation;
          }
        });

        //Check visibility
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
  //Ordinary animations
  $("*[class*='ani_']:not([class*='aniUtil_disabled'])").each(function() {
    var ani_classes = get_aniClasses(this);

    //When key is pressed
    if($(this).is('[class*="aniUtil_onKey"]')){
      var elem = this;
      var key = "";
      var classname = this.classList;
      $(classname).each(function(){
        if(this.match(/^aniUtil_onKey/)){
          key = this.split("-")[1];
        }
      });
      //Match key
      if(e.code == key){
        if($(elem).hasClass("aniUtil_dramatic")){
          $(elem).css("opacity", 100);
        }
        $(elem).addClass(ani_classes);
        if($(elem).hasClass("aniUtil_active")){
          elem.addEventListener('animationend', () => {
            $(elem).removeClass(ani_classes);
          });
        }
        else{
          $(elem).removeClass("aniUtil_onKey");
        }
      }
    }
  });

  //Custom animations
  //aniCus_tubeLight
  $("*[class*='aniCus_tubeLight']:not([class*='aniUtil_disabled'])").each(function() {
    //When key is pressed
    if($(this).is('[class*="aniUtil_onKey"]')){
      var elem = this;
      var key = "";
      var classname = this.classList;
      $(classname).each(function(){
        if(this.match(/^aniUtil_onKey/)){
          key = this.split("-")[1];
        }
      });
      //Match Key
      if(e.code == key){
        aniCus_tubeLight(this, 4);
      }
    }
  });

  //aniCus_OutIn
  $("*[class*='aniCus_OutIn']:not([class*='aniUtil_disabled'])").each(function() {
    var outInClasses = get_aniOutInClasses(this);
    var aniOut_classes = outInClasses[0];
    var aniIn_classes = outInClasses[1];
    //When key is pressed
    if($(this).is('[class*="aniUtil_onKey"]')){
      var elem = this;
      var key = "";
      var classname = this.classList;
      $(classname).each(function(){
        if(this.match(/^aniUtil_onKey/)){
          key = this.split("-")[1];
        }
      });
      //Match Key
      if(e.code == key){
        aniCus_OutIn(this, 4, aniOut_classes, aniIn_classes);
      }
    }
  });
}

//get animation class
function get_aniClasses(elem){
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
  var rect = elem.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;
  //Completely visible
  return ((elemTop >= 0) && (elemBottom <= window.innerHeight));
}

//Check if element is scrolled into division view
function isScrolledIntoDivView(elem, parent) {
  var parentTop = $(parent).offset().top;
  var parentBottom = parentTop + $(parent).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= parentBottom) && (elemTop >= parentTop));
}

//Custom animation function definitions
//aniCus_tubeLight
function aniCus_tubeLight(elem, type){
  //For click, mouse, and key animations
  if( type  == 2 || type == 3 || type == 4){
    if(!$(elem).hasClass("animate__animated") && !$(elem).hasClass("aniUtil_animating")){
      if($(elem).hasClass("aniUtil_dramatic")){
        $(elem).css("opacity", 100);
      }
      $(elem).addClass("aniUtil_animating");
      $(elem).addClass("animate__animated animate__flash animate__repeat-2 animate__faster");
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
      $(elem).addClass("aniUtil_animating");
      $(elem).addClass("animate__animated animate__flash animate__repeat-2 animate__faster");
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
  //For click, mouse, and key animations
  if( type  == 2 || type == 3 || type == 4){
    if(!$(elem).hasClass("animate__animated") && !$(elem).hasClass("aniUtil_animating")){
      if($(elem).hasClass("aniUtil_dramatic")){
        $(elem).css("opacity", 100);
      }
      $(elem).addClass("aniUtil_animating");
      $(elem).addClass(aniOut_classes);
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
      $(elem).addClass("aniUtil_animating");
      $(elem).addClass(aniOut_classes);
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

/* -----Utility Functions----- */
//aniUtil_disable()
function aniUtil_disable(which){
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
  else{
    var ani_Class = "ani_"+which;
    $("*[class*='"+ani_Class+"']").each(function() {
      $(this).addClass("aniUtil_disabled");
    });
  }
}

//aniUtil_enable()
function aniUtil_enable(which){
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
  else{
    var ani_Class = "ani_"+which;
    $("*[class*='"+ani_Class+"']").each(function() {
      $(this).removeClass("aniUtil_disabled");
    });
  }
}

//aniUtil_animate()
function aniUtil_animate(elem, ani_Class){
  if($(elem).hasClass('aniUtil_disabled')){
    $(elem).removeClass('aniUtil_disabled');
  }
  $(elem).addClass(ani_Class);
  view_Animations();
  click_Animations();
  hover_Animations();
}

//aniUtil_inanimate()
function aniUtil_inanimate(elem){
  $(elem).addClass('aniUtil_disabled');
}
