$(function() {
  populateButtons(reactionsArray,"searchButton", "#buttonsArea");
  });

var reactionsArray = ["Happy", "Sad", "Confused", "Excited", "Shocked"];

function populateButtons(reactionsArray,classToAdd,areaToAddTo){
  $(areaToAddTo).empty();
  for (var i=0; i<reactionsArray.length; i++){
    var a = $("<button>");
    a.addClass(classToAdd);
    a.attr("data-type", reactionsArray[i]);
    a.text(reactionsArray[i]);
    $(areaToAddTo).append(a);
  }
  console.log("populateButtons");
}

$(document).on("click", ".searchButton", function(){
  var type = $(this).data("type");
  console.log("button type: " + type);
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +type+ "&api_key=aZ0xckPnsX5SLz2rdEaUeZQ10TNmSR5F&limit=10";
  $.ajax({
    url: queryURL,method:"GET"
  })
  .done(function(response){
    console.log("search images");
    for (var i=0; i<response.data.length; i++){
      var searchDiv = $("<div class='searchItem'>");
      var rating = response.data[i].rating;
      var p = $("<p>").text("Rating:" +rating);
      var animated = response.data[i].images.fixed_height.url;
      var still = response.data[i].images.fixed_height_still.url;
      var image = $("<img>");
      image.attr("src", still);
      image.attr("data-still", still);
      image.attr("data-animated", animated);
      image.attr("data-state", "still");
      image.addClass("searchImage");
      searchDiv.append(image);
      $("#searches").append(searchDiv);
    }

  })
})

$(document).on("click", ".searchImage", function(){
  console.log("hey");
  var state = $(this).data("data-state");
  if(state === "still"){
    $(this).attr("src", $(this).data("animated"));
    $(this).attr("data-state", "animated");
  } else {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
  }

})

$("#addSearch").on("click", function(){
  var newSearch = $("input").eq(0).val();
  reactionsArray.push(newSearch);
  populateButtons(reactionsArray,"searchButton", "#buttonsArea");
  return false;
});






