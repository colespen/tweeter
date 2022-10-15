/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  ////    submit form ajax POST
  $('.new-tweet form').submit(function(event) {
    let serialized = $(this).serialize();
    let input = $(this).find('#tweet-text').val();
    
    event.preventDefault();
    if (!input) {
      const $errNull = $('<span>There\'s nothing here. Please elaborate.</span>').hide();
      $(".container").prepend($errNull);
      return $errNull.slideDown(500);
     
    }
    if (input.length > 140) {
      const $errLength = $('<span>Too many things. Please write a bit less.</span>').hide();
      $(".container").prepend($errLength);
      return $errLength.slideDown(500);
    }
    
    $('.container > span').slideUp(150);

    $.ajax({
      //tweets route mounted as prefix in index.js
      url: '/tweets',
      method: 'POST',
      data: serialized,

      success: function(data) {
        $('#tweets-container').empty();
        loadTweets();
        console.log('ajax POST SUCCESS', data);
      },
      error: function(errorMessage) {
        console.log('ajax POST ERROR', errorMessage);
      }
    });
  });

  ////    Load Tweets ajax GET
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',

      success: function(data) {
        renderTweets(data); // OR data.reverse()?
        console.log('ajax GET SUCCESS', data);
      },
      error: function(errorMessage) {
        console.log('ajax GET ERROR', errorMessage);
      }
    });
  };
  loadTweets();

  ////    Loops through tweets
  ////    Calls createTweetElement for each
  ////    Takes return and appends to container
  const renderTweets = function(tweetArray) {
    for (const tweet of tweetArray) {

      let makeTweet = createTweetElement(tweet);
      $('#tweets-container').append(makeTweet);
    }
  };

  ////    XSS Prevention
  const escUser = function(str) {
    let div = document.createElement("span");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const escHandle = function(str) {
    let div = document.createElement("h5");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const escContent = function(str) {
    let div = document.createElement("p");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  ////    takes in tweet obj
  ////    returns tweet <article>
  const createTweetElement = (tweetObj) => {
    let $tweetStructure =
      $(`
      <article class="tweet">
      <header>
        <div class="user-info">
          <div class="user-id">
            <img src=${tweetObj.user.avatars} id="tweet-img">
            <span>${escUser(tweetObj.user.name)}</span>
          </div>
          <h5>${escHandle(tweetObj.user.handle)}</h5>
        </div>
        <p>${escContent(tweetObj.content.text)}
        </p>
      </header>
      <div class="horiz-line-tweet"></div>
      <footer>
        <p>${timeago.format(tweetObj.created_at)}</p>
        <div class="tweet-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    `);
    return $tweetStructure;
  };

  ////    HIDE FORM then OPEN
  $('.new-tweet').hide();
  ////    T0ggle Slide functionality + animate
  $('.navbar-menu li').click(function() {
    $('.new-tweet').slideToggle(550);
  });

});