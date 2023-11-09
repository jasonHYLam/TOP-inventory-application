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

router.get('/home/artists/add', artist_controller.artist_add_get);
router.post('/home/artists/add', artist_controller.artist_add_post);

router.get('/home/artists/:id', artist_controller.artist_detail);


router.get('/home/artists', artist_controller.artist_list);



module.exports = router;
