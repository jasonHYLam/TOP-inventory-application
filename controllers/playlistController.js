const Playlist = require('../models/playlist');

const {validationResult, body} = require('express-validator');

const asyncHandler = require('express-async-handler');

exports.playlist_list = asyncHandler(async(req, res, next) => {
    const allPlaylists = await Playlist.find({}).exec();
    res.render('playlist_list', {
        title: 'All Playlists',
        playlist_list: allPlaylists,
    })
})

exports.playlist_detail = asyncHandler(async(req, res, next) => {
    const playlist = await Playlist.findById(req.params.id).exec();
    res.render('playlist_detail', {
        title: playlist.name,
        playlist: playlist,
        // need to add songs and genres 
    })
})

exports.playlist_add_get = asyncHandler(async(req, res, next) => {
    res.render('playlist_form', {
        title: 'Add Playlist',
    })
})

exports.playlist_add_post = [
    body("name")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Name required"),

    asyncHandler(async(req, res, next) => {

        const errors = validationResult(req);

        const playlist = new Playlist({
            name: req.body.name
        })

        if (!errors.isEmpty()) {
            res.render('playlist_form', {
                title: 'Add Playlist',
                playlist: playlist,
                errors: errors.array(),
            })
        }

        else {
            await playlist.save();
            res.redirect(playlist.url);
        }
    })
]