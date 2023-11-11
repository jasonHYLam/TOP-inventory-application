#! /usr/bin/env node

console.log(
    `This script populates the database with pre-written songs, genres and playlists.
    Specify the database URL as an argument.
    `
);

// Get arguments passed on command line

const userArgs = process.argv.slice(2);

const Genre = require('./models/genre');
const Playlist = require('./models/playlist');
const Song = require('./models/song');

const genres = [];
const playlists = [];
const songs = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log('Debug: About to connect');
    await mongoose.connect(mongoDB);
    console.log('Debug: Should be connected?');
    await createGenres();
    await createPlaylists();
    await createSongs();
    console.log('Debug: Closing mongoose');
    mongoose.connection.close();
}

// Indexes are passed to the _Create functions, so 
// genre[0] is always Rock, regardless of the order in which
// Promise.all() argument elements complete.
async function genreCreate(index, name) {
    const genre = new Genre({name: name})
    await genre.save();
    genres[index] = genre;
    console.log(`Added genre: ${name}`);
}

async function playlistCreate(index, name) {
    const playlist = new Playlist({name: name})
    await playlist.save();
    playlists[index] = playlist;
    console.log(`Added playlist: ${name}`);
}

async function songCreate(index, title, link, artist, album, genre, playlist) {
    const songDetail = {
        title: title,
    }

    if (link !== false) songDetail.link = link;
    if (artist !== false) songDetail.artist = artist;
    if (album !== false) songDetail.album = album;
    if (genre !== false) songDetail.genre = genre;
    if (playlist !== false) songDetail.playlist = playlist;

    const song = new Song({
        link: link,
        artist: artist,
        album: album,
        genre: genre,
        playlist: playlist,
    })
    await song.save();
    songs[index] = song;
    console.log(`Added song: ${song}`);
}

async function createGenres() {
    console.log('Adding genres');
    await Promise.all([
        genreCreate(0, 'Hip hop'),
        genreCreate(1, 'Rock'),
        genreCreate(2, 'Pop'),
        genreCreate(3, 'Electronic'),
        genreCreate(4, 'Folk'),
        genreCreate(5, 'Psychadelic'),
        genreCreate(6, 'Classical'),
        genreCreate(7, 'Video Game Music'),
        genreCreate(8, '60s'),
        genreCreate(9, '70s'),
        genreCreate(10, '80s'),
        genreCreate(11, '90s'),
        genreCreate(12, '00s'),
    ])
}

async function createPlaylists() {
    console.log("Adding playlists");
    await Promise.all([
        playlistCreate(0, 'For studying'),
        playlistCreate(1, 'Hype is great'),
        playlistCreate(2, 'In the feels'),
        playlistCreate(3, 'Something light'),
    ])
}

async function createSongs() {
    console.log("Adding songs");
    await Promise.all([
        songCreate(
            0,
            'Instant Crush',
            'https://www.youtube.com/watch?v=a5uQMwRMHcs',
            'Daft Punk',
            'Random Access Memories',
            [genres[2], genres[3],],
            [playlists[2], playlists[3],],
        ),
        songCreate(
            1,
            'Light My Fire',
            'https://www.youtube.com/watch?v=cq8k-ZbsXDI',
            'The Doors',
            'The Doors',
            [genres[1], genres[5], genres[8],],
            [playlists[1]],
        ),
        songCreate(
            2,
            'Big Day',
            'https://www.youtube.com/watch?v=xswAOJLgTi8',
            'XTC',
            'Skylarking',
            [genres[1], genres[5], genres[11],],
            [playlists[3],],
        ),
        songCreate(
            3,
            'In The Mouth A Desert',
            'https://www.youtube.com/watch?v=duq-Wrc3pI4',
            'Pavement',
            'Slanted And Enchanted',
            [genres[1], genres[11],],
            [playlists[2], playlists[3],],
        ),
        songCreate(
            4,
            'Billie Jean',
            'https://www.youtube.com/watch?v=Zi_XLOBDo_Y',
            'Michael Jackson',
            'Thriller',
            [genres[2], genres[10],],
            [playlists[3],],
        ),
    ])
}
