$(document).ready(function() {
  $(function() {

    $('.scroll-top').hide();

    $(window).scroll(function() {
      if ($(this).scrollTop() > 400) {
        $('.scroll-top').fadeIn(1400);
      } else {
        $('.scroll-top').fadeOut();
      }
    });
    // scroll animate - body -> 0px on click
    $('a.scroll-top').click(function() {
      $('body, html').animate({
        scrollTop: 0
      }, 500);
      return false;
    });
  });
});