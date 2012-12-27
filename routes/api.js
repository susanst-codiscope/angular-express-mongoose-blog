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
*/

var data = [];

Track.find({}, function (err, records) {
  records.forEach(function (track, i) {
    data.push({
      id: i,
      title: track.title,
      text: track.text.substr(0, 50) + '...'
    });
  });
  console.log(data.length);
});


// GET

exports.tracks = function (req, res) {
    
        res.json({
          tracks: data
        });

};

exports.post = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.length) {
    res.json({
      post: data[id]
    });
  } else {
    res.json(false);
  }
};

// POST

exports.addPost = function (req, res) {
  data.push(req.body);
  res.json(req.body);
};

// PUT

exports.editPost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.length) {
    data[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
};

// DELETE

exports.deletePost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.length) {
    data.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};