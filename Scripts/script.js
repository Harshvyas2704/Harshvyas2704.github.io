$(document).ready(function(){

    $('#menu').click(function(){
      $(this).toggleClass('fa-times');
      $('header').toggleClass('toggle');
    });
  
    $(window).on('scroll load',function(){
  
      $('#menu').removeClass('fa-times');
      $('header').removeClass('toggle');
  
      if($(window).scrollTop() > 0){
        $('.top').show();
      }else{
        $('.top').hide();
      }
  
    });
  
    // smooth scrolling 
  
    $('a[href*="#"]').on('click',function(e){
  
      e.preventDefault();
  
      $('html, body').animate({
  
        scrollTop : $($(this).attr('href')).offset().top,
  
      },
        500, 
        'linear'
      );
  
    });
  
  });

  function SendMail(){
    var params = {
      from_name : document.getElementById("firstName").value,
      email_id : document.getElementById("emailId").value,
      message : document.getElementById("message").value
    }

    emailjs.send("service_bna9z3v", "template_w82hu9r", params).then(function (res){
      alert("success!" + res.status);
    })
  }