// twitter keys variable
var keys = require('./keys.js')

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

// TWITTER FUNCTION
function twitter(){

  var Twitter = require('twitter');

  var client = new Twitter({
    consumer_key: 'GX9Tln4JRsbV98Jg3Sae0j9ya',
    consumer_secret_key: 'vBYXjcxpoeCkC6gk04TRVq9HK3LBPCL8ZWKD4ucz4G28apX8F4',
    access_token: '745949227264598016-NweQfD11EvWlGAfARQ7W2UQbrfqBIlQ',
    access_token_secret: 'l1wLgYrlNVF26Wt5xmVkOw54I6V0tNgBxX2TPBBh3s9lL'
  });

  var params = {screen_name: 'creativelaurels'};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    console.log(tweets);
    if (!error) {
      console.log(tweets);
    }
  });
}


//SPOTIFY FUNCTION
function spotify() {

  var spotify = require('spotify');
  spotify.search({ type: 'track', query: value }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

    console.log(data);
});
}
