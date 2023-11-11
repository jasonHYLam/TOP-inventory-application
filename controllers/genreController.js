const Genre = require('../models/genre');
const Song = require('../models/song');

const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.genre_list = asyncHandler(async(req, res, next) => {
    const allGenres = await Genre.find({}).exec();
    res.render('genre_list', {
        title: "All Genres",
        genre_list: allGenres,
    })
})

exports.genre_detail = asyncHandler(async(req, res, next) => {
    const [genre, allSongsInGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Song.find({genre: req.params.id}).exec(),
    ]);

    res.render('genre_detail', {
        title: genre.name,
        genre: genre,
        songs: allSongsInGenre,
    })
})

exports.genre_add_get = asyncHandler(async(req, res, next) => {
    res.render("genre_form", {
        title: 'Add Genre'
    })
})

exports.genre_add_post = [
    body("name")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Name required"),

    asyncHandler(async(req, res, next) => {

        const errors = validationResult(req)
        const genre = new Genre({
            name: req.body.name
        })

        if (!errors.isEmpty()) {
            res.render('genre_form', {
                title: genre.name,
                genre: genre,
                errors: errors.array(),
            })
        }
        else {
            await genre.save();
            res.redirect(genre.url);
        }
})
]

exports.genre_delete_get = asyncHandler(async(req, res, next) => {
    const genre = await Genre.findById(req.params.id).exec();
    res.render('genre_delete', {
        title: 'Delete Genre',
        genre: genre,
    })
})

exports.genre_delete_post = asyncHandler(async(req, res, next) => {
    // not sure if this works tbh. dunno if req params id is what i need
    await Genre.findByIdAndDelete(req.params.id);
    res.redirect('/home/genres')
})
