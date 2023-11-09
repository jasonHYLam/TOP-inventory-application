const Artist = require('../models/artist')

const { body, validationResult } = require('express-validator');

const asyncHandler = require('express-async-handler');

exports.artist_list = asyncHandler(async(req, res, next) => {
    const allArtists = await Artist.find({}).exec() 
    res.render("artist_list", {
        title: "Artists",
        artist_list: allArtists,
    })
})

exports.artist_detail = asyncHandler(async(req, res, next) => {
})

exports.artist_create_get = asyncHandler(async(req, res, next) => {
    res.render("artist_form", {title: "Add Artist"})
})

exports.artist_post = asyncHandler(async(req, res, next) => {
})

exports.artist_list = asyncHandler(async(req, res, next) => {
})

exports.artist_list = asyncHandler(async(req, res, next) => {
})

exports.artist_list = asyncHandler(async(req, res, next) => {
})

exports.artist_list = asyncHandler(async(req, res, next) => {
})
