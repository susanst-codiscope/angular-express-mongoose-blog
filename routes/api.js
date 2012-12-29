/*
 * Serve JSON to our AngularJS client
 */

// For a real app, you'd make database requests here.
// For this example, "data" acts like an in-memory "database"
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);

var trackSchema = mongoose.Schema({title: 'string', text: 'string'});
var Track = mongoose.model('Track', trackSchema);
/*
var woods = new Track({title: 'new hobotrack', text: "it's a goodone"});
woods.save();  
////

Track.find(function (err, tracks) {
  tracks.forEach(function (track, i) {
    
    console.log(track.text);
    });
  });*/


// GET

exports.tracks = function (req, res) {  
  Track.find({}, function (err, tracks) {
   // console.log("number of tracks: " + tracks.length );
    //console.log("the records: " + records);
    /*records.forEach(function (track, i) {
      data.push({
        id: i,
        title: track.title,
        text: track.text.substr(0, 50) + '...'
      });
    });*/


        res.json({
          tracks: tracks
        });
  });
};

exports.post = function (req, res) {
  Track.findOne({_id: req.params.id}, function(err,obj) {
    console.log('returns the post: ' + obj);
  res.json({
    post: obj
    });
});
};
/*
  var id = req.params.id;
  if (id >= 0 && id < data.length) {
    res.json({
      post: data[id]
    });
  } else {
    res.json(false);
  }*/


// POST

exports.addPost = function (req, res) {
  var newTrack = new Track(req.body);
  newTrack.save();
  console.log("post added: " + req.body);
  res.json(req.body);
};

// PUT



exports.editPost = function (req, res) {
  //console.log("edit post: " + req.body.title);
  Track.findByIdAndUpdate(req.params.id, { 
    $set: { text: req.body.text, title: req.body.title }}, {upsert:true}, function (err, user) {
      return res.json(true);
    }
  );
};

exports.deletePost = function (req, res) {
  Track.remove({_id: req.params.id}, function (err) {
    if (!err) {
      console.log('no delete post error');
      res.json(true);
    }
    else {
      console.log('delete post error');
      res.json(false);
    }
  });
  /*var id = req.params.id;
  if (id >= 0 && id < data.length) {
    data.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }*/
};

