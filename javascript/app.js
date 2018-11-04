/*  - Create an array of related things
    - Create for loop to poulate page with buttons
    - Add search bar
    - Value in search bar is pushed to current array
    - Will need controls for the starting and stopping of gifs
*/
let topics = [];

$("#add-user").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    let newTopic = $("#find-topic").val().trim();
    topics.push(newTopic);});

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
    let searchTopic = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      searchTopic + "&api_key=PTyPj05INMiXMaDcWb36KtqE9cYwa931&rating=g&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
      // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.

      console.log(response);
      

      // Step 2: since the image information is inside of the data key,
      // make a variable named results and set it equal to response.data

      // =============== put step 2 in between these dashes ==================
      var results = response.data;

      // ========================

      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);

      // Step 3: uncomment the for loop above and the closing curly bracket below.
      // Make a div with jQuery and store it in a variable named animalDiv.
        var animalDiv = $("<div>");
        // Make a paragraph tag with jQuery and store it in a variable named p.
        var p = $("<p>");
        // Set the inner text of the paragraph to the rating of the image in results[i].
        p.text(results[i]);
        // Make an image tag with jQuery and store it in a variable named animalImage.
        var animalImage = $("<img>");
        // Set the image's src to results[i]'s fixed_height.url.
        animalImage.attr("src", results[i].fixed_height.url);
        // Append the p variable to the animalDiv variable.
        animalDiv.append(p);
        // Append the animalImage variable to the animalDiv variable.
        animalDiv.append(animalImage);
        // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
        $("#gifs-appear-here").prepend(animalDiv);


      }

    })
});
