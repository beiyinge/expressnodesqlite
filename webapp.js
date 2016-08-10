var express = require('express');

var cookieParser = require('cookie-parser');

var dbconn = require('./dbconn.js');

var app = express();

app.use(express.static('public'));

app.use(cookieParser());

app.get('/logon/:id', function (req, res) {
	var userid = req.params.id;  
	
	var p = dbconn.getUserJSON(userid);
	console.log('userid='+userid);
	p.then(
		(val) => {
			res.cookie('userid', userid);
			res.redirect('/UserOwnTweets.html');
		},
		(err) => {
			console.log('oh no!', err);
		}
	);
	
});

app.get('/tweets/:id', function (req, res) {
	var userid = req.params.id;  
	
	var p = dbconn.getUserTweetsJSON(userid);
	p.then(
		(val) => {
			res.send(val);
		},
		(err) => {
			console.log('oh no!', err);
		}
	);

});

app.get('/followedtweets/:id', function (req, res) {
	var userid = req.params.id;  
	
	var p = dbconn.getFollowersJSON(userid);
	p.then(
		(val) => {
			res.send(val);
		},
		(err) => {
			console.log('oh no!', err);
		}
	);

});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});