/*  - Create an array of related things
    - Create for loop to poulate page with buttons
    - Add search bar
    - Value in search bar is pushed to current array
    - Will need controls for the starting and stopping of gifs
*/
let topics = ["basketball", "football"];

function addButtons(){
    for (let x = 0; x < topics.length; x++){
       let newButton = $("<button>");
       newButton.text(topics[x]);
       newButton.attr("data-name", topics[x]);
       $("#buttonArea").append(newButton); 
    }
};

$("#add-topic").on("click", function(event) {
    event.preventDefault();

    let newTopic = $("#find-topic").val().trim();
    topics.push(newTopic);
});

$(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});    

$("button").on("click", function() {
    let searchTopic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      searchTopic + "&api_key=PTyPj05INMiXMaDcWb36KtqE9cYwa931&rating=g&limit=10";

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

          // Appending the paragraph and image tag to the animalDiv
          topicDiv.append(p);
          topicDiv.append(topicImage);

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifArea").prepend(topicDiv);
      }
  });
});

addButtons();
