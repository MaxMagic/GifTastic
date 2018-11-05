var topics = ["basketball", "football","soccer"];
var searchTopic;

function addButtons(){
  $("#buttonArea").html("");
    for (var x = 0; x < topics.length; x++){
      var newButton = $("<button>");
      newButton.text(topics[x]);
      newButton.attr("data-name", topics[x]);
      newButton.attr("id", "topicButton");
      newButton.addClass("btn btn-dark btn-space");
      $("#buttonArea").append(newButton); 
    }
};

$("#add-topic").on("click", function(event) {
    event.preventDefault();

    var newTopic = $("#find-topic").val().trim();

    if (topics.indexOf(newTopic) === -1 && newTopic !== ""){
      topics.push(newTopic);
      $("#find-topic").val("");
      addButtons();
    } else {
      alert("You added that one already! Choose another topic!");
      $("#find-topic").val("");
    };
  });  


$("#gifArea").on("click", ".gif", function() {
      
      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});    

$("#buttonArea").on("click", "#topicButton", function() {
  searchTopic = $(this).attr("data-name");
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTopic + "&api_key=PTyPj05INMiXMaDcWb36KtqE9cYwa931&rating=g&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        var topicDiv = $("<div>");

        var p = $("<p>").text("Rating: " + results[i].rating);

        var topicImage = $("<img>");
        
        topicImage.attr("src", results[i].images.fixed_height_still.url);
        topicImage.attr("data-still", results[i].images.fixed_height_still.url);
        topicImage.attr("data-animate", results[i].images.original.url);
        topicImage.attr("data-state", "still");
        topicImage.addClass("gif btn-space");

        topicDiv.append(p);
        topicDiv.append(topicImage);

        $("#gifArea").prepend(topicDiv);
      }
  });
});

addButtons();
