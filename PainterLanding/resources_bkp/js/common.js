$(document).ready(function () {

    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll > 50) {
          $(".navbar").css("background" , "#fff");
          $('.navbar').addClass("fixed")
        }
        else{
            $(".navbar").css("background" , "transparent");  
            $('.navbar').removeClass("fixed")	
        }
    })

    var visitedPage = window.location.toString();
    if (visitedPage.indexOf("/Step") != -1) {
        //var hdnForm = $('#hdnForm').val();
        //if (hdnForm === "") {
        //    window.location.href = "/express-painting-getintouch/nov2020/";
        //}
       // $('#hdnForm').val('');
        window.location.href = "/imperia-breathe-easy";
    }
    $('#next').click(function () {
        var result = ProceedToStep1();
        if (result) {
            try {
                RunGACode('Step1.html');
                $('.step1').addClass('d-none');
                $('.step2').removeClass('d-none');

            }
            catch (err) {
                console.log('Step2 error ' + err.message);
            }
        }

    });

    $('#send').click(function () {
        var result = ProceedToStep1();
    });
    $('.benefits_dealer').owlCarousel({
        loop: true,
        margin: 5,
        nav: false,
        dots: true,
        responsiveClass: true,
        autoplay: false,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
                loop: false
            }
        }
    })
    
    $('.faq-carousel').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        dots: true,
        responsiveClass: true,
        autoplay: false,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
                loop: false
            }
        }
    })
    $('.img_gallery').owlCarousel({
        loop: true,
        margin: 15,
        nav: true,
        navText:["<img src='PainterLanding/resources/images/owl-prev.png' class='img-fluid'>", "<img src='PainterLanding/resources/images/owl-next.png' class='img-fluid'>"],
        dots: true,
        responsiveClass: true,
        autoplay: 3000,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            }
        }
    })
    $('.video_gallery').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        navText:["<img src='PainterLanding/resources/images/owl-prev.png' class='img-fluid'>", "<img src='PainterLanding/resources/images/owl-next.png' class='img-fluid'>"],
        dots: true,
        responsiveClass: true,
        autoplay: 3000,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            }
        }
    })

    $('.productSlider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        adaptiveHeight: true,
        variableWidth: true,
        infinite: true,
        arrows: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
      });

    $("#get-started,#form,#xpForm,#formOne,#formTwo,#formThr,#formFou,#contactUs").click(function () {
        $('html, body').animate({
            scrollTop: $("#dvForm").offset().top - 120
        }, 1500);
    });
    

    

    function RunGACode(step) {        
        var baseUrl = "https://berger.teamhgs.com/dealer";
        //var baseUrl = $('#UatBaseUrl').val() + 'imperia-breathe-easy';
        var pagepath = window.location.toString();

        if (step == "ThankYou") {
            pagepath = baseUrl + "/" + step;
        }
        else {
            if (pagepath.indexOf('?') == -1) {

                pagepath = baseUrl + "/" + step;
            }
            else {

                var querystringData = window.location.search.toString();

                pagepath = baseUrl + "/" + step + "/" + querystringData;
            }
        }

        //var _phoneNumber = document.getElementById("txtexpPhone").value;
        //var shaValue = SHA256(_phoneNumber);
        //alert(shaValue);
        window.history.pushState("object or string", "Title", pagepath);
        //gtag('config', 'UA-181014550-1', { 'page_path': pagepath });
    }

        var highestBox = 0;
            $('.dealer_benefit_box .content_box').each(function(){  
                    if($(this).height() > highestBox){  
                    highestBox = $(this).height();  
            }
        });    
        $('.dealer_benefit_box .content_box').height(highestBox);

       
        // $("#store_Name").hide();
        //     $("input[name='inlineRadioOptions']").click(function() {
        //     if ($("#inlineRadio1").is(":checked")) {
        //         $("#store_Name").show();
        //     } else {
        //         $("#store_Name").hide();
        //     }
        // }); 
       
        


   
});

$("#exclBenefits").click(function () {
    $('html, body').animate({
        scrollTop: $("#dvForm").offset().top - 70
    }, 2000);
});
$("#joinHands").click(function () {
    $('html, body').animate({
        scrollTop: $("#dvForm").offset().top - 70
    }, 2000);
});