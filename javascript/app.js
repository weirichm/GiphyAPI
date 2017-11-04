var reactions = ["Happy", "Sad", "Confused", "Excited", "Shocked"];
var currentGif; 
var pausedGif; 
var animatedGif; 
var stillGif;

//creates buttons
function createButtons(){
  $("#reactionButtons").empty();
  for(var i = 0; i < showTitle.length; i++){
    var showBtn = $('<button>').text(showTitle[i]).addClass('showBtn').attr({'data-name': showTitle[i]});
    $("#reactionButtons").append(showBtn);
  }

  //displays gifs on click
  $('.showBtn').on('click', function(){
    $('.display').empty();

    var newReaction = $(this).data('name');
    var giphyURL = "https://api.giphy.com/v1/gifs/search?&q=reactions" + newReaction + "api_key=aZ0xckPnsX5SLz2rdEaUeZQ10TNmSR5F&limit=10&offset=0&rating=PG-13&lang=en";
    $.ajax({
      url: giphyURL, method: 'GET'}
      ).done(function(giphy)
      {

      currentGif = giphy.data;
      $.each(currentGif, function(index,value){
        animatedGif= value.images.original.url;
        pausedGif = value.images.original_still.url;
        var thisRating = value.rating;
        //gives blank ratings 'unrated' text
        if(thisRating == ''){
          thisRating = 'unrated';
        }
        var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
        stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
        var fullGifDisplay = $('<button>').append(rating, stillGif);
        $('.display').append(fullGifDisplay);
      });
    });
  });
}



//sets a button from input
$('#addShow').on('click', function(){
  var newShow = $('#newShowInput').val().trim();
  showTitle.push(newShow);
  createButtons();
  return false;
});

createButtons();