#! /usr/bin/env node


const userArgs = process.argv.slice(2);

const Genre = require('./models/genre');
const Playlist = require('./models/playlist');
const Song = require('./models/song');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log('Debug: About to connect');
    await mongoose.connect(mongoDB);
    console.log('Debug: About to delete documents');
    await Promise.all([
        Genre.deleteMany({}),
        Playlist.deleteMany({}),
        Song.deleteMany({}),
    ])
    console.log('Debug: Closing mongoose');
    mongoose.connection.close();

}