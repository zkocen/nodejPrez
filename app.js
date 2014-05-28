
/**
 * Module dependencies.
 */

var express = require('express');
var home = require('./routes/home');
var about = require('./routes/about');
var whatnode = require('./routes/whatnode');
var whatexpress = require('./routes/whatexpress');
var gettingstarted = require('./routes/gettingstarted');
var game = require('./routes/game');


var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes


app.get('/', home.home);
app.get('/home', home.home);
app.get('/about', about.about);
app.get('/whatnode', whatnode.whatnode);
app.get('/whatexpress', whatexpress.whatexpress);
app.get('/gettingstarted', gettingstarted.gettingstarted);

var games = [];

app.post('/game', function(req,res){
	var game = {
		id: games.length,
		player1: 0,
		player2: 0
	}
	games.push(game);
  	res.send(game);
});

app.post('/game/:id/score/:player', function(req,res){
	for (var i = 0; i < games.length; i++) {
		if (games[i].id == req.param('id')) {

			var currentGame = games[i];

			if(req.param('player') === '1'){
				currentGame.player1++;
			}

			if(req.param('player') === '2'){
				currentGame.player2++;
			}

			res.send(games[i]);
			return;
		}
	}
	res.send(404);
});

app.get('/game', function(req,res){
  	res.send(games);
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
