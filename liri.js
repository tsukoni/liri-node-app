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

    musicLover.search({ type: 'track', query: additional, limit: 1 }, function(err, data) {
        if (!err) {
            console.log(data.tracks.items);

        }
    });
}

function movies() {
    if (additional != null) {
        request('http://www.omdbapi.com/?apikey=40e9cece&t=' + additional, function(error, response, body) {
            console.log(JSON.parse(body).Title + " " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating +
                "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry: " + JSON.parse(body).Country +
                "\nLanguages: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot +
                "\nActors: " + JSON.parse(body).Actors);
        });
    } else {
        request('http://www.omdbapi.com/?apikey=40e9cece&t=mr+nobody', function(error, response, body) {
            console.log(JSON.parse(body).Title + " " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating +
                "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry: " + JSON.parse(body).Country +
                "\nLanguages: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot +
                "\nActors: " + JSON.parse(body).Actors);
        });
    }
}

function dwis() {
    fs.readFile('random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        var newFile = data.split(",");
        execute = newFile[0].trim();
        additional = newFile[1].trim();
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
            default:
                console.log("LIRI doesn't know that");
        }
    });
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
    default:
        console.log("LIRI doesn't know that");
}