var userCommand = process.argv[2];
var userInput = process.argv[3];

//twitter
var Twitter = require('twitter');
var keys = require('./keys.js');
var client = new Twitter(keys.twitterKeys);
