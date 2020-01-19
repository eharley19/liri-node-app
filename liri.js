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
    var artistQuery = `https://rest.bandsintown.com/artists/${userInput}/events?app_id=codingbootcamp`;
    
    console.log(`Searching concert information for ${userInput}...`); 

    axios.get(artistQuery).then(
        
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
    spotify.search({ type: 'track', query: userInput, limit: 1 }, function(error, data) {
        console.log(`Searching for ${userInput}...`); 
        if (error) {
          return console.log(`Error: ${error}`);
        } else {
        console.log('-----------');
        console.log(`Artist: ${data.tracks.items[0].album.artists[0].name}`);
        console.log(`Song Name: ${data.tracks.items[0].name}`);
        console.log(`Spotify Preview Link: ${data.tracks.items[0].external_urls.spotify}`);
        console.log(`Album Name: ${data.tracks.items[0].album.name}`);
        }
    })  
};

function movieThis() {
    var movieQuery = `http://www.omdbapi.com/?t=${userInput}&y=&plot=short&apikey=trilogy`;

    console.log(`Searching for ${userInput}...`);

    axios.get(movieQuery).then(
        function(movieResponse){
            console.log('-----------');
            console.log(`Title:  ${movieResponse.data.Title}`);
            console.log(`Year:  ${movieResponse.data.Year}`);
            console.log(`Rated: ${movieResponse.data.imdbRating}`);
            console.log(`Country: ${movieResponse.data.Country}`);
            console.log(`Language: ${movieResponse.data.Language}`);
            console.log(`Plot: ${movieResponse.data.Plot}`);
            console.log(`Actors: ${movieResponse.data.Actors}`);
            console.log(`Rotten Tomatoes: ${movieResponse.data.Ratings[1].Value}`);
        }
    );
};


function userCommand(command) {
    if (!command) {
        console.log("Please try again and enter a request.");
    } else if (command === "spotify-this-song") {
        spotifyThisSong();
    } else if (command === "concert-this") {
        concertThis();
    } else if (command === "movie-this") {
        movieThis();
    }
}
userCommand(command);

