$(document).ready(function() {

  $('#tweet-text').on('input', function() {
    let counter = $(this).val().length;

    $(this).siblings('.form-footer').children('.counter').text(140 - counter);
    if (counter <= 140) {
      $('.counter').css("color", "#000000c8");
    }
    if (counter > 140) {
      $(this).siblings('.form-footer').children('.counter').css("color", "#fb5947");
    }
  });

});

