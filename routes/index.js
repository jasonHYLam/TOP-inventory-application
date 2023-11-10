const song_controller = require("../controllers/songController");
const artist_controller = require("../controllers/artistController");
const genre_controller = require("../controllers/genreController");
const playlist_controller = require("../controllers/playlistController");


var express = require('express');
var router = express.Router();

// Redirect to home page.
router.get('/', function(req, res, next) {
  res.redirect('/home');
})
/* GET home page. */
router.get('/home', song_controller.home);


// Artists Routes And Methods
router.get('/home/artists/add', artist_controller.artist_add_get);
router.post('/home/artists/add', artist_controller.artist_add_post);
router.get('/home/artists/:id', artist_controller.artist_detail);
router.get('/home/artists', artist_controller.artist_list);


// Genres Routes And Methods
router.get('/home/genres/add', genre_controller.genre_add_get);
router.post('/home/genres/add', genre_controller.genre_add_post);
router.get('/home/genres/:id', genre_controller.genre_detail);
router.get('/home/genres', genre_controller.genre_list);

// Playlist Routes And Method
router.get('/home/playlists/add', playlist_controller.playlist_add_get);
router.post('/home/playlists/add', playlist_controller.playlist_add_post);
router.get('/home/playlists/:id', playlist_controller.playlist_detail);
router.get('/home/playlists/', playlist_controller.playlist_list);

module.exports = router;
