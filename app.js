
/**
 * Module dependencies.
 */

var express = require('express');
var home = require('./routes/home');
var about = require('./routes/about');
var whatnode = require('./routes/whatnode');
var whatexpress = require('./routes/whatexpress');
var gettingstarted = require('./routes/gettingstarted');

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

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
