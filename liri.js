
var request = require("request");
var spotify = require('spotify');
var fs = require('fs');
var Twitter = require("twitter");

var twitKey = require("./keys.js");
var client = new Twitter(twitKey.twitterKeys);

var inputArgs = process.argv;
var whatToDo = inputArgs[2];
var songMovie = inputArgs.slice(3);

directIt(whatToDo);

//--------------------Functions-------------------------------- 
// route the requested service to its function
function directIt(play) { 
	switch(play) {
		case "my-tweets":
			getTweets();
			break;
		case "spotify-this-song":
			getSong();
			break;
		case "movie-this":
			getMovieInfo();
			break;
		case "do-what-it-says":
			getDoer();
			break;
		default:
			console.log("Invalid option");
	};
};
//-----------------------------------
// get last Twitter tweets
function getTweets() {
	var params = { screen_name: 'SunshineFarty', count: 20 };
	//console.log(client);

	//use the Twitter npm to retrieve & display last 20 tweets
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
  			var twits = [];  //array to hold tweets
      		for (var i = 0; i < tweets.length; i++) {
        		twits.push({
            		'created at: ' : tweets[i].created_at,
            		'Tweets: ' : tweets[i].text
        		});
      		}
      		console.log(twits);
 		} else {
 			console.log("Failure on twitter " + JSON.stringify(error));
 		}; 
	});
};
//-----------------------------------
// get song info from Spotify
function getSong() { 
	//console.log("songMovie is " + songMovie);
	if (songMovie == "") {
	    //console.log("song not entered - using default")
		songMovie = "The Sign";
	};
	//console.log("songMovie is " + songMovie);

	//find the song that was entered on the command line and report song info
	spotify.search({ type: 'track', query: songMovie, limit: 1 }, function(err, data) {
    	if ( err ) { 
        	console.log('Error occurred: ' + JSON.stringify(err));
       	    return;
    	} else {
    		var songInfo = data.tracks.items[0];
    		//console.log("spotify data " + JSON.stringify(songInfo));
    		console.log("Artist: " + songInfo.artists[0].name);
    		console.log("Song name: " + songInfo.name);
    		console.log("Preview link: " + songInfo.preview_url);
    		console.log("Album: " + songInfo.album.name);
   		};
	});
};
//-------------------------------------------
// get information about entered movie title from OMDB
function getMovieInfo() { 
	//console.log("Movie entered " + songMovie);
	if (songMovie == "") {
		songMovie = "Mr Nobody";
	};
	//console.log("Movie entered " + songMovie);

	var queryUrl = "http://www.omdbapi.com/?t=" + songMovie + "&y=&plot=short&tomatoes=true&r=json";

	request(queryUrl, function(error, response, body) {
  		if (!error && response.statusCode === 200) {
			var omdbRec = JSON.parse(body);
			console.log("Title: " + omdbRec.Title);
			console.log("Released: " + omdbRec.Year);
			console.log("IMDB Rating: " + omdbRec.imdbRating);
			console.log("Country: " + omdbRec.Country);
			console.log("Language: " + omdbRec.Language);
			console.log("Plot: " + omdbRec.Plot);
			console.log("Actors: " + omdbRec.Actors);
			for (var i = 0; i < omdbRec.Ratings.length; i++) {
				if (omdbRec.Ratings[i].Source === "Rotten Tomatoes") {
					console.log("Rotten Tomatoes Rating: " + omdbRec.Ratings[i].Value);
				};
			};
			console.log("Rotten Tomatoes URL: " + omdbRec.tomatoURL);
		} else {
			console.log("Error in OMDB call");
		};
	});
};
//----------------------------------------
// for the 'do what it says' option
function getDoer() {
	fs.readFile("random.txt", "utf8", function(err, data) {
		var splitData = data.split(",");
		whatToDo = splitData[0];
		songMovie = splitData[1];
		//console.log("whatToDo " + whatToDo + " and songMovie " + songMovie);
		directIt(whatToDo);
	})
	
};
