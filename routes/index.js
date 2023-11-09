const song_controller = require("../controllers/songController");
const artist_controller = require("../controllers/artistController");
var express = require('express');
var router = express.Router();

// Redirect to home page.
router.get('/', function(req, res, next) {
  res.redirect('/home');
})
/* GET home page. */
router.get('/home', song_controller.home);

router.get('/artists', artist_controller.artist_create_get);

router.get('/artists/create')

module.exports = router;
