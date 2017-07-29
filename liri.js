//global variables
var userCommand = process.argv[2];
var userInput = process.argv[3];
var fs = require('fs');

//JS switch
switch(userCommand) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this" :
        movieThis();
        break;
}   

//twitter function (changed to include variables within the function)
function myTweets() {
    var Twitter = require('twitter');
    var keys = require('./keys.js');
    var client = new Twitter(keys.twitterKeys);
    var params = {screen_name: 'atomic_covert', count: 20};
    
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error && response.statusCode == 200) {
                // console.log(tweets);
                for(var i = 0; i < tweets.length; i++) {
                        console.log("\n============== Tweet " + [i] + " =============\n");
                        console.log(tweets[i].text);
                }//end of twitter for loop
            }//end of conditional statement
        });
    }; // end twitter function

//spotify variables
 var spotify = require('node-spotify-api')
 var spotifyApi = new spotify(keys.spotifyKeys);


//spotify function
	function spotifyThis() {
    if (userInput != undefined) {
		spotifyApi.search({type: 'track', query: userInput + '&limit=5'}, function (err,data) {
        if (err) {
          return console.log(err);
        } else {
          if (data.tracks.items.length === 0) {
            return console.log('Track not found, please try again');
          }
          // console.log(data);
          console.log('Artist:', data.tracks.items[0].artists[0].name);
          console.log('Track:', data.tracks.items[0].name);
          console.log('Preview Link:', data.tracks.items[0].preview_url);
          console.log('Album:', data.tracks.items[0].album.name);
          console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        }
        });

  	} else {
        userInput = 'The Sign';
  	}
}//end spotify function


//movie variables
	var request = require('request');
    var imdbUrl = 'http://www.omdbapi.com/?apikey=40e9cece&t=' + userInput +'&y=&plot=short&r=json';

//movie function
function movieThis(userInput){
    request(imdbUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var movieObj = JSON.parse(body);
        if (movieObj.Response == 'False') {
            return console.log('Invalid movie title.');
        }else{
        console.log(movieObj.Title);
        console.log(movieObj.Year);
        console.log(movieObj.imdbRating);
        console.log(movieObj.Country);
        console.log(movieObj.Language);
        console.log(movieObj.Plot);
        console.log(movieObj.Actors);
        console.log(movieObj.tomatoRating);
        console.log(movieObj.tomatoURL);
        console.log('---------------------------------------------------------------');
       }
        }
    });
}//end movie function 

movieThis();
spotifyThis();
myTweets();