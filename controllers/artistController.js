const Artist = require('../models/artist')

const { body, validationResult } = require('express-validator');

const asyncHandler = require('express-async-handler');

exports.artist_list = asyncHandler(async(req, res, next) => {
    const allArtists = await Artist.find({}).exec(); 
    res.render("artist_list", {
        title: "Artists",
        artist_list: allArtists,
    })
})

exports.artist_detail = asyncHandler(async(req, res, next) => {
    const artist = await Artist.findById(req.params.id).exec();
    res.render("artist_detail", {
        title: artist.name,
        artist: artist,
    })
})

exports.artist_add_get = asyncHandler(async(req, res, next) => {
    res.render("artist_form", {title: "Add Artist"})
})

exports.artist_add_post = [
    body('name')
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Name required"),

    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req)

        const artist = new Artist({
            name: req.body.name
        })

        if (!errors.isEmpty()) {
            res.render('artist_form', {
                title: "Artists",
                artist: artist,
                errors: errors.array(),
            })
            return;
        }
        else {
            await artist.save();
            res.redirect(artist.url);
        }
})
]

// exports.artist_list = asyncHandler(async(req, res, next) => {
// })

// exports.artist_list = asyncHandler(async(req, res, next) => {
// })

// exports.artist_list = asyncHandler(async(req, res, next) => {
// })

// exports.artist_list = asyncHandler(async(req, res, next) => {
// })
