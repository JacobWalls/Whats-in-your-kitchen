//$.backstretch("http://res.cloudinary.com/codingbootcamp/image/upload/c_fit,h_700/v1524791753/background.jpg");
var userZipcode;
$("#back").hide();
$(".container").hide();
$("#add-user").click(function (event) {
  event.preventDefault();
  // Initial Values
  var name = "";
  var email = "";
  var zipcode = "";
  name = $("#exampleInputName").val().trim();
  email = $("#exampleInputEmail1").val().trim();
  zipcode = $("#exampleInputZipcode").val().trim();
  $("#continue").text("hi, " + name + "!");
  console.log(name);
  console.log(email);
  console.log(zipcode);
  //empty out input fields after last user
  $("#exampleInputName").val("");
  $("#exampleInputEmail1").val("");
  $("#exampleInputZipcode").val("");

  if(!name==""&&!email== " "&&!zipcode==""){
 $(".main").show();
  $("#sign-up-form").toggle();
  $("#add-user").toggle();
  var config = {
    apiKey: "AIzaSyCyq05OybcgW5FOvPiDrBQscEWl_p2BPiA",
    authDomain: "recipe-app-3ba55.firebaseapp.com",
    databaseURL: "https://recipe-app-3ba55.firebaseio.com",
    projectId: "recipe-app-3ba55",
    storageBucket: "",
    messagingSenderId: "1053202008671"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();
  database.ref().set({
    name: name,
    email: email,
    zipcode: zipcode
  });
database.ref().once("value").then(function(snapshot){
  userZipcode = (snapshot.val().zipcode);
})

  }else{
    $(".error-messages").text("The form is not complete.").show();
  }



});


$("#continue").click(function (event) {
  $(".container").toggle();
  $("#sign-up-form").toggle();
  $("#back").toggle();
  $("#continue").toggle()
})

$("#back").click(function (event) {
  $(".container").toggle();
  $("#sign-up-form").toggle();
  $("#back").toggle();
  $("#continue").toggle()

})

$("#recipe-search").on("click", function(event) {
  event.preventDefault();

  // In this case, the "this" keyword refers to the button that was clicked
  var ingredients = $("#ingredient-search").val();
  console.log(ingredients);

  var recipequeryURL = "https://api.edamam.com/search?q=" +
    ingredients + "&app_id=34b92ab5" + "&app_key=db5e2409c61531b092a4927d225ce0c8";

  $.ajax({
      url: recipequeryURL,
      method: "GET"
    })
    .then(function(response) {
      var results = response.hits;

      var recipeList = $("<ul>");

      for (var i = 0; i < results.length; i++) {
        //var recipeImage = $("<img>").attr("src", results[i].recipe.image);
        var recipeImage = $('<div>').css({
          'background-image': 'url("' + results[i].recipe.image + '")',
          'background-size': 'cover'
        });
        var p = $("<p>").text(results[i].recipe.label);
        var list = $("<li>");
        var clickRecipeIcon = $("<a>").attr("href", results[i].recipe.url);
        clickRecipeIcon.append(recipeImage);
        list.append(p);
        list.append(clickRecipeIcon);
        recipeList.append(list);
      }
      $("#recipe-section").empty();
      $("#recipe-section").append(recipeList);
    });
  
  var yelpqueryURL = "https://school.cloud.tyk.io/yelp?location=" + userZipcode + "&radius=8046&limit=10";

  $.ajax({
      url: yelpqueryURL,
      method: "GET"

    })

    .then(function(response) {
      console.log(response);
      var results = response.businesses;
      var yelpList = $("<ul>");
      for (var i = 0; i < results.length; i++) {
        var list = $("<li>");
        var p = $("<p>").text(results[i].name);
        // var yelpImage = $("<img>").attr("src", results[i].image_url);
        var yelpImage = $('<div>').css({
            'background-image': 'url("' + results[i].image_url + '")',
            'background-size': 'cover'
        });
        var clickRestaurantImage = $("<a>").attr("href", results[i].url);
        clickRestaurantImage.append(yelpImage);
        list.append(p);
        list.append(clickRestaurantImage);
        yelpList.append(list);
      }
      $("#restaurant-section").empty();
      $("#restaurant-section").append(yelpList);

    })

});




