!function(t){"use strict";t('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var e=t(this.hash);if((e=e.length?e:t("[name="+this.hash.slice(1)+"]")).length)return t("html, body").animate({scrollTop:e.offset().top-70},1e3,"easeInOutExpo"),!1}}),t(document).scroll(function(){t(this).scrollTop()>100?t(".scroll-to-top").fadeIn():t(".scroll-to-top").fadeOut()}),t(".js-scroll-trigger").click(function(){t(".navbar-collapse").collapse("hide")}),t("body").scrollspy({target:"#mainNav",offset:80});var e=function(){t("#mainNav").offset().top>100?t("#mainNav").addClass("navbar-shrink"):t("#mainNav").removeClass("navbar-shrink")};e(),t(window).scroll(e),t(function(){t("body").on("input propertychange",".floating-label-form-group",function(e){t(this).toggleClass("floating-label-form-group-with-value",!!t(e.target).val())}).on("focus",".floating-label-form-group",function(){t(this).addClass("floating-label-form-group-with-focus")}).on("blur",".floating-label-form-group",function(){t(this).removeClass("floating-label-form-group-with-focus")})})}(jQuery);var i,acc=document.getElementsByClassName("accordion");for(i=0;i<acc.length;i++)acc[i].addEventListener("click",function(){this.classList.toggle("active");var t=this.nextElementSibling;t.style.maxHeight?t.style.maxHeight=null:t.style.maxHeight=t.scrollHeight+"px"});let done=!1;var xmlHttp=new XMLHttpRequest;xmlHttp.onreadystatechange=function(){if(4==xmlHttp.readyState&&200==xmlHttp.status){document.getElementById("12312313").style.display="inherit";let t=JSON.parse(xmlHttp.responseText);$("#12312313").waypoint(function(){if(done)return;done=!0;let e=new CountUp("stats-users",t.users,{prefix:"Watching ",suffix:" Users"}),o=new CountUp("stats-channels",t.channels,{prefix:"in ",suffix:" Channels"}),n=new CountUp("stats-servers",t.servers,{prefix:"on ",suffix:" Servers"});e.error||o.error||n.error?console.error(e.error||o.error||n.error):(e.start(),o.start(),n.start())},{offset:"65%"})}},xmlHttp.open("GET","https://api.chewey-bot.top/analytics/getlatest/402412293998116864",!0),xmlHttp.send(null);
