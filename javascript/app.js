/*  - Create an array of related things
    - Create for loop to poulate page with buttons
    - Add search bar
    - Value in search bar is pushed to current array
    - Will need controls for the starting and stopping of gifs
*/
var topics = ["basketball", "football"];
var searchTopic;

function addButtons(){
  $("#buttonArea").html("");
    for (var x = 0; x < topics.length; x++){
      var newButton = $("<button>");
      newButton.text(topics[x]);
      newButton.attr("data-name", topics[x]);
      newButton.addClass("topicButton")
      $("#buttonArea").append(newButton); 
    }
};

$("#add-topic").on("click", function(event) {
    event.preventDefault();

    var newTopic = $("#find-topic").val().trim();

    if (topics.indexOf(newTopic) === -1){
      topics.push(newTopic);
      console.log(topics);
      $("#find-topic").val("");
      addButtons();
    } else {
      alert("You added that one already! Choose another topic!");
      console.log(topics);
      topics.pop();
      $("#find-topic").val("");
    };
  });  


$(".gif").on("click", function() {
      
      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});    

$(".topicButton").on("click", function() {
  searchTopic = $(this).attr("data-name");

  console.log(searchTopic);
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTopic + "&api_key=PTyPj05INMiXMaDcWb36KtqE9cYwa931&rating=g&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

      console.log(queryURL);
      console.log(response);

      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var topicDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var topicImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        topicImage.attr("src", results[i].images.fixed_height_still.url);
        topicImage.attr("data-still", results[i].images.fixed_height_still.url);
        topicImage.attr("data-animate", results[i].images.original);
        topicImage.attr("data-state", "still");
        topicImage.addClass("gif");

        // Appending the paragraph and image tag to the animalDiv
        topicDiv.append(p);
        topicDiv.append(topicImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifArea").prepend(topicDiv);
      }
  });
});

addButtons();
