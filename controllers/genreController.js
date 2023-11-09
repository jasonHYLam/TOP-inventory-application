const Genre = require('../models/genre');
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
    const genre = await Genre.findById(req.params.id)
    res.render('genre_detail', {
        title: genre.name,
        genre: genre,
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
