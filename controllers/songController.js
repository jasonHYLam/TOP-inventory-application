const Song = require('../models/song');
const Genre = require('../models/genre');
const Playlist = require('../models/playlist');

const asyncHandler = require('express-async-handler');

const { validationResult, body } = require('express-validator');
const genre = require('../models/genre');

// requires information about all models; songs, artists, albums, genres.
// implement this later

exports.home = asyncHandler(async(req, res, next) => {
    res.render("home")
})

exports.song_list = asyncHandler(async(req, res, next) => {
    const allSongs = await Song.find({}).exec();
    res.render('song_list', {
        title: 'All Songs',
        song_list: allSongs,
    })
})

exports.song_detail = asyncHandler(async(req, res, next) => {
    const song = await Song.findById(req.params.id).exec();
    res.render('song_detail', {
        title: song.title,
        song: song,
    })
})

exports.song_add_get = asyncHandler(async(req, res, next) => {
    const [allGenres, allPlaylists] = await Promise.all([
        Genre.find({}).exec(),
        Playlist.find({}).exec(),
    ])

    res.render('song_list', {
        title: 'All Songs',
        genres: allGenres,
        playlists: allPlaylists,
    })
})

exports.song_add_post = [

    // Convert genres list into an array
    (req, res, next) => {
        if (!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === 'undefined') req.body.genre = [];
            else req.body.genre = new Array(req.body.genre);
        }
        next();
    },

    body("title", "Set a title")
    .trim()
    .isLength({min: 1})
    .escape(),

    body("link", "Set an song link")
    .trim()
    .escape(),

    body("artist", "Set an artist")
    .trim()
    .escape(),

    body("album")
    .trim()
    .escape(),

    body("genre.*")
    .escape(),

    body("playlist.*")
    .escape(),


    asyncHandler(async(req, res, next) => {
        errors = validationResult(req);

        const song = new Song({
            title: req.body.title,
            link: req.body.link,
            artist: req.body.artist,
            album: req.body.album,
            genre: req.body.genre,
            playlist: req.body.playlist,
        })

        if (!errors.isEmpty()) {
            const [allGenres, allPlaylists] = Promise.all([
                Genre.find().exec(),
                Playlist.find().exec(),
            ]);

            // Mark the selected genres as checked.
            for (const genre of allGenres) {
                if (song.genre.includes(genre._id)) {
                    genre.checked = 'true';
                }
            }

            // Mark the selected playlists as checked.
            for (const playlist of allPlaylists) {
                if (song.playlist.includes(playlist._id)) {
                    genre.checked = 'true';
                }
            }

            res.render('playlist_form', {
                title: 'Add Song',
                song: song,
                genres: allGenres,
                playlists: allPlaylists,
            })
        }

        else {
            await song.save();
            res.redirect(song.url)
        }
})
]
