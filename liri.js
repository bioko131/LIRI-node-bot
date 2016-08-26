
// declaring command variables
var action = process.argv[2];
// either the name of a song, or movie
var value = process.argv[3];

// switch case for whatever command the user enters
switch(action){
    case 'my-tweets':
        twitter();
    break;

    case 'spotify-this-song':
        spotify();
    break;

    case 'movie-this':
        movie();
    break;

    case 'do-what-it-says':
        doit();
    break;

    default:
    break;
}

// TWITTER FUNCTIONnode liri.
function twitter(){
  // twitter keys variable, referencing the keys file and export line
  var twitterKeys = require('./keys.js').twitterKeys;
  // npm package
  var Twitter = require('twitter');
  // assigning the keys
  var client = new Twitter(twitterKeys);
  // what to search for
  var params = {screen_name: 'creativelaurels'};
  console.log(params);

  // using the npm
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  console.log("Here");
    //if error, log it, else log the tweets
    if (error) {
      console.log(error);
    }
    else {
      console.log(tweets);
    }
  });
}


//SPOTIFY FUNCTION
function spotify() {
  //npm package
  var spotify = require('spotify');

  spotify.search({type: 'track', query: value, }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

    console.log("/////////Data////////")
    console.log(data);
    console.log("///////Data.tracks///////")
    var spotifyCall = data.tracks;
    var test = data.value;
    console.log(spotifyCall);
    console.log("/////////////////");
    console.log(test);

});
}

//OMDB FUNCTION
function movie() {
  //npm package
var request = require('request');
// set movie name equal to user input
var movieName = value;
var movieDefault = "Mr.Nobody";
// search url variable
var url = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json';
var urlDefault = 'http://www.omdbapi.com/?t=' + movieDefault + '&y=&plot=short&r=json';

  // if the user entered
 if (movieName != null) {
    request(url, function (error, response, body) {

      //console.log(body);
      // If the request is successful
      if (!error && response.statusCode == 200) {
              // Parse the body and pull for each attribute
              console.log("Title: " + value);
              console.log("Year: " + JSON.parse(body)["Year"]);
              console.log("Rating: " + JSON.parse(body)["imdbRating"]);
              console.log("Country of Production: " + JSON.parse(body)["Country"]);
              console.log("Language: " + JSON.parse(body)["Language"]);
              console.log("Plot: " + JSON.parse(body)["Plot"]);
              console.log("Actors: " + JSON.parse(body)["Actors"]);
            };

      });

      // // if user doesn't enter a value value will be set to Mr.Nobody
    } else {
      request(urlDefault, function (error, response, body) {

        //console.log(body);
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode == 200) {

          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("Title: " + movieDefault);
          console.log("Year: " + JSON.parse(body)["Year"]);
          console.log("Rating: " + JSON.parse(body)["imdbRating"]);
          console.log("Country of Production: " + JSON.parse(body)["Country"]);
          console.log("Language: " + JSON.parse(body)["Language"]);
          console.log("Plot: " + JSON.parse(body)["Plot"]);
          console.log("Actors: " + JSON.parse(body)["Actors"]);
        };

        });

    } // end of else
  } // end of movie()
