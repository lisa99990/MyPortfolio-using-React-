jQuery(document).ready(function($) {
  var time = 380;
  setTimeout(function() {
    $("h1.responsive-headline").fitText(1, { minFontSize: "40px", maxFontSize: "90px" });

    $(".smoothscroll").on("click", function(e) {
      e.preventDefault();
      var target = this.hash,
        $target = $(target);

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top
          },
          800,
          "swing",
          function() {
            window.location.hash = target;
          }
        );
    });

    var sections = $("section");
    var navigation_links = $("#nav-wrap a");

    sections.waypoint({
      handler: function(event, direction) {
        var active_section;

        active_section = $(this);
        if (direction === "up") active_section = active_section.prev();

        var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

        navigation_links.parent().removeClass("current");
        active_link.parent().addClass("current");
      },
      offset: "35%"
    });

    $("header").css({ height: $(window).height() });
    $(window).on("resize", function() {
      $("header").css({ height: $(window).height() });
      $("body").css({ width: $(window).width() });
    });

    $(window).on("scroll", function() {
      var h = $("header").height();
      var y = $(window).scrollTop();
      var nav = $("#nav-wrap");

      if (y > h * 0.2 && y < h && $(window).outerWidth() > 768) {
        nav.fadeOut("fast");
      } else {
        if (y < h * 0.2) {
          nav.removeClass("opaque").fadeIn("fast");
        } else {
          nav.addClass("opaque").fadeIn("fast");
        }
      }
    });

    $(".flexslider").flexslider({
      namespace: "flex-",
      controlsContainer: ".flex-container",
      animation: "slide",
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false
    });

    $("form#contactForm button.submit").click(function() {
      $("#image-loader").fadeIn();

      var Name = $("#contactForm #Name").val();
      var Email = $("#contactForm #Email").val();
      var MessageTitle = $("#contactForm #MessageTitle").val();
      var Message = $("#contactForm #Message").val();
      var Phone = $("#contactForm #Phone").val();
        
      if(Name=="" || Email=="" || MessageTitle==""|| Message==""){
        $("#image-loader").fadeOut();
            $("#message-warning").html("Please fill out required field");
            $("#message-warning").fadeIn();
            return false;
      }
      else{
        if(Phone!=""){
          var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
          if(!re.test(Phone)){
            // takes (123) 456-7890 , (123)456-7890 ,123-456-7890 ,1234567890
            $("#image-loader").fadeOut();
            $("#message-warning").html("Please use proper phone number syntax : (123) 456-7890 , (123)456-7890 ,123-456-7890 ,1234567890");
            $("#message-warning").fadeIn();
            return false;
          }
          
        }
          var data ='{"Name":' + '"'+Name + '"'+',"Email":' + '"'+Email +'"'+',"MessageTitle":' +'"'+  MessageTitle +'"'+',"Message":' +'"'+ Message + '"'+',"Phone":' +'"'+ Phone +'"'+'}';

          $.ajax({
            type: "POST",
             //url: "inc/sendEmail.php",
            url: "https://23zf1l8djl.execute-api.us-east-1.amazonaws.com/V2/contact",
            data: data,
            success: function(msg) {
              // Message was sent
              if (msg == "Success") {
                $("#image-loader").fadeOut();
                $("#message-warning").hide();
                $("#contactForm").fadeOut();
                $("#message-success").fadeIn();
              }
              // There was an error
              else {
                $("#image-loader").fadeOut();
                $("#message-warning").html(msg);
                $("#message-warning").fadeIn();
              }
            }
          });
         
      }
      return false;
    });
  }, time);
});
