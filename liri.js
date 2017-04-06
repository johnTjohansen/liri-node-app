var omdb = require("omdb");
var Twitter = require("./keys.js");
var spotify = require('spotify');
//var rotten = require('rotten-api')("YOU_API_KEY");

var inputArgs = process.argv;
var whatToDo = inputArgs[2];
var songMovie = inputArgs[3].splice;

switch(whatToDo) {
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
	default;

}

function getSong() { 
	if (songMovie = "") {
		songMovie = "The Sign";
	};

	spotify.search({ type: 'track', query: songMovie }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
};

// get information about entered movie title
function getTweets() {
	var params = {screen_name: 'nodejs'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
   		   console.log(tweets);
 		 }
	});
};

// get information about entered movie title
function getMovieInfo() { 
	if (songMovie = "") {
		songMovie = "Mr Nobody";
	};
	omdb.search(songMovie, function(error, movies) {
		if (!error) {
			var omdbRec = JSON.parse(movies);
			console.log("Title: " + omdbRec.title);
			console.log("Released: " + omdbRec.year);
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
			console.log("Rotten Tomatoes URL: not available");
			/*var imdbId = omdbRec.imdbID;
			rotten.alias(imdbId, function (err, res) {
			    if (!err) {
				   var rotRec = JSON.parse(res);
   			       var rotURL = rotRec.links.self;
   			       console.log("Rotten Tomatoes URL: " + rotURL);
     			} else {
     			   console.log("Error in Rotten Tomatoes call");
     			};   				 
			});*/
		} else {
			console.log("Error in OMDB call");
		};
	};
};
