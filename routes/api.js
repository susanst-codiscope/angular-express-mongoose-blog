/*
 * Serve JSON to our AngularJS client
 */

// For a real app, you'd make database requests here.
// For this example, "data" acts like an in-memory "database"
var mongoose = require('mongoose');
mongoose.connect('localhost', 'test')

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

exports.addTrack = function (req, res) {
  data.track.push(req.body);
  res.json(req.body);
};

// PUT

exports.editTrack = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.length) {
    data.track[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
};

// DELETE

exports.deleteTrack = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.track.length) {
    data.track.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};