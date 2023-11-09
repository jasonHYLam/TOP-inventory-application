const Song = require('../models/song');
const Artist = require('../models/artist')
const Album = require('../models/album');
const Genre = require('../models/genre');

const asyncHandler = require('express-async-handler');

// requires information about all models; songs, artists, albums, genres.
// implement this later

exports.home = asyncHandler(async(req, res, next) => {
    res.render("home")
})