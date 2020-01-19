require("dotenv").config();
const keys = require("./key");
const fs = require("fs");
const axios = require("axios");
const moment = require("moment");

const command = process.argv[2];
const userInput = process.argv.slice(3).join(" ");


var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify);



function concertThis() {
    var queryURL = `https://rest.bandsintown.com/artists/${userInput}/events?app_id=codingbootcamp`;
    
    console.log(`Searching concert information for ${userInput}`); 

    axios.get(queryURL).then(
        
        function(response){
            console.log('----------');
            console.log("Venue: " + response.data[0].venue.name);
            console.log("City: " + response.data[0].venue.city);
            console.log("Date of the Event: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
        }
    ).catch((error)=> {
        console.log(`Error: ${error}`);

    });
};

function spotifyThisSong() {
    spotify.search({ type: 'track', query: userInput, limit: 1 }, function(err, data) {
        console.log(`Searching for ${userInput}...`); 
        if (err) {
          return console.log('Error occurred: ' + err);
        } else {
        console.log('-----------');
        console.log(`Artist: ${data.tracks.items[0].album.artists[0].name}`);
        console.log(`Song Name: ${data.tracks.items[0].name}`);
        console.log(`Spotify Preview Link: ${data.tracks.items[0].external_urls.spotify}`);
        console.log(`Album Name: ${data.tracks.items[0].album.name}`);
        }
    })  
}

function userCommand(command) {
    if (command === "spotify-this-song") {
        spotifyThisSong();
    } else if (command === "concert-this") {
        concertThis();
    }
}
userCommand(command);

