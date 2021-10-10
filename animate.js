/*
 * animate.js - http://animate-dynamic.tk/
 * Version - 1.1.3
 * Licensed under the MIT license - https://opensource.org/licenses/MIT

 * Copyright (c) 2021 Mohammed Khurram (KodingKhurram)
 */

$(window).on("load", function() {
  //Dramatic animations, initialization
  $(".aniUtil_dramatic").each(function() {
    $(this).css("opacity", 0);
  });

  //If the element is already visible on screen
  $("*[class*='ani_']").each(function() {
    var ani_Class = "";
    var ani_classes = "";
    var classname = this.classList;
    $(classname).each(function(){
      if(this.match(/^ani_/)){
        ani_Class = this;
        var animation = this.split("_")[1];
        ani_classes = "animate__animated animate__"+animation;
      }
    });

    //Check visibility
    if( ((!$(this).hasClass("aniUtil_onClick")) && (!$(this).hasClass("aniUtil_onMouse")) && (!$(this).is('[class*="aniUtil_onKey"]'))) ){
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
    }

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

    //On mouse over
    if($(this).hasClass("aniUtil_onMouse")){
      $(this).mouseover(function(){
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
      });
    }
  });

  /*Custome animations goes here*/

  //aniCus_clickDisabled
  $("*[class*='aniCus_clickDisabled']").each(function() {
    $(this).click(function(){
      if($(this).hasClass("aniCus_clickDisabled")){
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
  $("*[class*='aniCus_tubeLight']").each(function() {
    //Check visibility
    if( ((!$(this).hasClass("aniUtil_onClick")) && (!$(this).hasClass("aniUtil_onMouse")) && (!$(this).is('[class*="aniUtil_onKey"]'))) ){
      if (isScrolledIntoView(this) === true) {
        aniCus_tubeLight(this, 1);
      }
      else{
        if( $(this).hasClass("aniUtil_active") ){
          if($(this).hasClass("aniUtil_dramatic")){
            $(this).css("opacity", 0);
          }
          $(this).removeClass("animate__animated animate__fadeIn animate__slower");
        }
      }
    }

    //on Click
    if($(this).hasClass("aniUtil_onClick")){
      $(this).click(function(){
        aniCus_tubeLight(this, 2);
      });
    }

    //on Mouse
    if($(this).hasClass("aniUtil_onMouse")){
      $(this).mouseover(function(){
        aniCus_tubeLight(this, 3);
      });
    }
  });

  //On scroll of Division
  $(".aniUtil_scrollDiv").each(function(){
    $(this).scroll(function() {
      var parent = this;
      $("*[class*='aniIn_']").each(function() {
        var ani_Class = "";
        var ani_classes = "";
        var classname = this.classList;
        $(classname).each(function(){
          if(this.match(/^aniIn_/)){
            ani_Class = this;
            var animation = this.split("_")[1];
            ani_classes = "animate__animated animate__"+animation;
          }
        });

        //When scrolled in to view
        if( ((!$(this).hasClass("aniUtil_onClick")) && (!$(this).hasClass("aniUtil_onMouse")) && (!$(this).is('[class*="aniUtil_onKey"]'))) ){
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
        }
      });
    });
  });
});

//On scroll of Window
$(window).scroll(function() {

  $("*[class*='ani_']").each(function() {
    var ani_Class = "";
    var ani_classes = "";
    var classname = this.classList;
    $(classname).each(function(){
      if(this.match(/^ani_/)){
        ani_Class = this;
        var animation = this.split("_")[1];
        ani_classes = "animate__animated animate__"+animation;
      }
    });

    //Check visibility
    if( ((!$(this).hasClass("aniUtil_onClick")) && (!$(this).hasClass("aniUtil_onMouse")) && (!$(this).is('[class*="aniUtil_onKey"]'))) ){
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
    }
  });

  /* Custom animations goes here */
  //aniCus_tubeLight
  $("*[class*='aniCus_tubeLight']").each(function() {
    //Check visibility
      if( ((!$(this).hasClass("aniUtil_onClick")) && (!$(this).hasClass("aniUtil_onMouse")) && (!$(this).is('[class*="aniUtil_onKey"]'))) ){
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
      }
    });
});

//On key KeyPress
$(document).keyup(function(e){
  $("*[class*='ani_']").each(function() {
    var ani_Class = "";
    var ani_classes = "";
    var classname = this.classList;
    $(classname).each(function(){
      if(this.match(/^ani_/)){
        ani_Class = this;
        var animation = this.split("_")[1];
        ani_classes = "animate__animated animate__"+animation;
      }
    });

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
  });

//Functions definitions

// Check if element is scrolled into view
function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

// Check if element is scrolled into division view
function isScrolledIntoDivView(elem, parent) {
  var parentTop = $(parent).offset().top;
  var parentBottom = parentTop + $(parent).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= parentBottom) && (elemTop >= parentTop));
}

/* Custom animation function definitions */

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
            elem.addEventListener("animationend", () => {
              $(elem).removeClass("aniUtil_animating");
            });
            if($(elem).hasClass("aniUtil_active")){
              elem.addEventListener('animationend', () => {
                $(elem).removeClass("animate__animated animate__fadeIn animate__slower");
              });
            }
            else{
              if( type == 2) $(elem).removeClass("aniUtil_onClick");
              else if( type == 3) $(elem).removeClass("aniUtil_onMouse");
            }
          });
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
              $(elem).removeClass("aniUtil_animating");
            });
          });
        });
      });
    }
  }
}
