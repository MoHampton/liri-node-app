//global variables
var userCommand = process.argv[2];
var userInput = process.argv[3];
var fs = require('fs');

//twitter keys
var Twitter = require('twitter');
var keys = require('./keys.js');
var client = new Twitter(keys.twitterKeys);
var params = {screen_name: 'atomic_covert', count: 20};

//twitter function
function myTweets(){
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error && response.statusCode == 200) {
                // console.log(tweets);
                for(var i = 0; i < tweets.length; i++) {
                        console.log("\n============== Tweet " + [i] + " =============\n");
                        console.log(tweets[i].text);
                        // console.log(tweets);
                        ;
                }//end of twitter for loop
            }//end of conditional statement
        });
    }; // end twitter function

myTweets(); 