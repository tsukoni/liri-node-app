var execute = process.argv[2];
var additional = process.argv[3];
var fs = require("fs");
var superKeys = require("./keys.js");
console.log(superKeys);

var Twitter = require('twitter');
var tweeter = new Twitter({
    consumer_key: superKeys.twitterKeys.consumer_key,
    consumer_secret: superKeys.twitterKeys.consumer_secret,
    access_token_key: superKeys.twitterKeys.access_token_key,
    access_token_secret: superKeys.twitterKeys.access_token_secret
});

var Spotify = require('node-spotify-api');
var musicLover = new Spotify({
    id: superKeys.spotifyKeys.id,
    secret: superKeys.spotifyKeys.secret
});

var request = require('request');


function tweets() {
    var params = { screen_name: 'foodnetwork', count: "20" };
    tweeter.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 20; i++) {
                console.log("\n" + tweets[i].text);
            }
        }
    });
}

function spotify() {

    musicLover.search({ type: 'track', query: additional }, function(err, data) {
        if (!err) {
            console.log(data.tracks.items);

        }
    });
}

function movies() {
    if (additional != null) {
        request('http://www.omdbapi.com/?apikey=40e9cece&s=' + additional, function(error, response, body) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        });
    } else {
        request('http://www.omdbapi.com/?apikey=40e9cece&s=mr+nobody', function(error, response, body) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        });
    }
}

function dwis() {

}
switch (execute) {
    case 'my-tweets':
        tweets();
        break;
    case 'spotify-this-song':
        spotify();
        break;
    case 'movie-this':
        movies();
        break;
    case 'do-what-it-says':
        dwis();
        break;
}