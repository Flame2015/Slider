imageGalary = {
    mainimageArray: [],
    thumbimageArray: [],
    left: 0,
    counter: 0,
    thumbCounterleft:0,
    imagecounter: 0,
    thumbleft:0,
    thumbcounter:0,
    
    init: function() {
        $.ajax({
            url: "xml/image_gallery.xml",
            success: function(data, textStatus, jqXHR) {

                $(data).find("option").each(function(i) {
                    imageGalary.imagecounter = i;
                   
                    imageGalary.mainimageArray.push($(this).find("mainimage").text());
                    imageGalary.thumbimageArray.push($(this).find("thumbimage").text());
                });
                for (var i = 0; i < imageGalary.mainimageArray.length; i++)
                {
                    $(".subslide").append(imageGalary.mainimageArray[i]);
                    $(".thumbnavigator").append(imageGalary.thumbimageArray[i]);
                }
                $(".subslide").find("img").each(function(i) {
                    $(this).attr("id", i);
                    $(".thumbnavigator").find("img").eq(i).attr("id", i);
                });

                $(".subslide").width($(".subslide").find("img").length * $(".slides").width());
                $(".thumbnavigator").width($(".thumbnavigator").find("img").length * $(".thumbslide").width());
                
                
                imageGalary.clickEvents();
                imageGalary.swipeimage();
                imageGalary.imageSelect();
                imageGalary.thubmnailswipe();
                imageGalary.netFixAndoriadissue();
                


            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("data not found" + textStatus);
                console.log("errorThrown" + errorThrown);
            }

        });
    },
    
    netFixAndoriadissue : function ()
    {
        $(document).bind("mobileinit", function(){

        $.mobile.touchOverflowEnabled = false;

        $.mobile.defaultPageTransition = 'none';

        $.mobile.defaultDialogTransition = 'none';

        $.mobile.useFastClick = false

        $.mobile.buttonMarkup.hoverDelay = 0;  

        $.mobile.page.prototype.options.domCache = false;                   

        $.event.special.swipe.scrollSupressionThreshold = 30;

    });

    $(document).bind("touchstart", function(event){});
    },
    
    
    clickEvents: function() {
             $(".subslide").bind('touchstart',function(event) 
             {
                event.preventDefault();
             }
       );
        $(".arrowleft").off().on("click", function() 
        {
            if (imageGalary.counter == 0)
            {
                $(".arrowleft").animate({"opacity": 0.2}, 200);
            }
            else if(imageGalary.counter > 0)
            {
               
                $(".arrowright").animate({"opacity": 1}, 200);
                imageGalary.imageleft();
            }
            
        });

        $(".arrowright").off().on("click", function() {
//            if (imageGalary.counter == imageGalary.imagecounter)
//            {
//                $(".arrowright").animate({"opacity": 0.2}, 200, function() {
//                    $(this).attr("disabled", true);
//                });
//            }
             if(imageGalary.counter < imageGalary.imagecounter)
            {
             
                $(".arrowleft").animate({"opacity": "1"}, "slow");                
                imageGalary.imageright();        
            }
            else if(imageGalary.counter == imageGalary.mainimageArray.length)
            {
                //imageGalary.counter = 0;
                $(".subslide img:first-child").appendTo(".subslide");
                imageGalary.imageright(); 
                
            }
        });
    },
    
    
    swipeimage: function() 
    {
       $(".subslide").find("img").off("swiperight").on("swiperight", function(event) 
       {    
            if (imageGalary.counter == 0)
            {
                console.log("swipe right stop");
            }
            else if(imageGalary.counter > 0)
            
            {
                console.log("swiperight");
                console.log(imageGalary.counter);
                imageGalary.imageleft();
            }
        });
        $(".subslide").find("img").off("swipeleft").on("swipeleft", function(event)
        {
           if(imageGalary.counter == imageGalary.imagecounter)
           {
               console.log("swipeleft stop");
           }
           else if (imageGalary.counter < imageGalary.imagecounter)
           {
                console.log("swipeleft");
                console.log(imageGalary.counter);
                imageGalary.imageright();
            }
        });
    },
    
    imageSelect: function() {
        
//        $(".thumbnavigator").find("img").off("click").on("click", function() {
            
            $("body").delegate(".thumb","click",function (){

            var eq = $(this).attr("id");
            var intEq = parseInt(eq);
            imageGalary.counter = intEq;
            var clickLeft = ($(".slides").width() * $(this).attr("id"));
            imageGalary.left = -clickLeft;
            $(".thumbnavigator").find("img").animate({"opacity": 1});
            $(".subslide").animate({"left": "" + -clickLeft + "px"}, "slow", function() {
                $(".thumb").eq(intEq).animate({"opacity": 0.5}, "fast");
            });
            console.log(imageGalary.counter);
            imageGalary.buttonenable();
            
        });
    },
    
    imageright: function() 
    {
        $(".subslide").animate({"left": "" + imageGalary.left - $(".slides").width() + "px"}, "slow", function() {
            $(".thumb").eq(imageGalary.counter - 1).animate({"opacity": "1"}, "fast", function() {
                $(".thumb").eq(imageGalary.counter).animate({"opacity": "0.5"}, "fast");
            });
        });
       
       
       //$(".subslide img:first-child").appendTo(".subslide");
       
        imageGalary.left += -$(".slides").width();
        imageGalary.counter++;
      
    
    
      imageGalary.thubmnailMove();

    },
    imageleft: function() {
        if (imageGalary.left <= -$(".slides").width())
        {
            imageGalary.left = imageGalary.left + $(".slides").width();
            $(".subslide").animate({"left": "" + imageGalary.left + "px"}, "slow", function() {
                $(".thumb").eq(imageGalary.counter + 1).animate({"opacity": "1"}, "fast", function() {
                    $(".thumb").eq(imageGalary.counter).animate({"opacity": "0.5"}, "fast");
                });
            });
            imageGalary.counter--;
            
            
            imageGalary.thubmnailMove();
        }


    },
    
    thubmnailMove: function()
    {  
        
        
    },
    
    thubmnailswipe:function ()
    {
        $(".thumbnavigator").find("img").off("swiperight").on("swiperight",function(){
            
            if((imageGalary.counter > 0)||(imageGalary.thumbcounter> 0))
            {
                console.log("swiperight");
                imageGalary.thumbleft -= $(".thumb").width();
                imageGalary.thumbcounter --;
                $(".thumbnavigator").animate({"left":-imageGalary.thumbleft});
                
                
            }
            else
            {
                console.log("swiperight not move");
            }
        });
        $(".thumbnavigator").find("img").off("swipeleft").on("swipeleft",function (){
            
            if((imageGalary.counter < imageGalary.imagecounter)&&(imageGalary.thumbcounter !== imageGalary.imagecounter/2))
            {
                console.log("swipeleft");
                
                imageGalary.thumbleft += $(".thumb").width();
                imageGalary.thumbcounter ++;
                $(".thumbnavigator").animate({"left":-imageGalary.thumbleft});
                
            }
            else
            {
                console.log("swipeleft not move");
            }
                
            
        });
    },
    
    
    
    buttonenable: function()
    {
        console.log(imageGalary.counter);
        if (imageGalary.counter > 0)
        {
            $(".arrowleft").animate({"opacity": "1"}, "slow");
        }
        else if (imageGalary.counter == 0)
        {
            $(".arrowleft").animate({"opacity": 0.5}, "slow");
        }
        else if (imageGalary.counter == imageGalary.imagecounter)
        {
            $(".arrowright").animate({"opacity": 0.5}, "slow");
        }
        else if (imageGalary.counter < imageGalary.imagecounter)
        {
            $(".arrowright").animate({"opacity": 1}, "slow");
        }


    }
};

$(document).ready(function() {
    imageGalary.init();

});