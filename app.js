
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  aws = require('aws-sdk');

var app = module.exports = express.createServer();



// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API

app.get('/api/posts', api.posts);

app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server
  var awsKey = ENV[AWS_ACCESS_KEY_ID];


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  console.log("config.api_key");
});
