const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SongSchema = new Schema({
    title: {type: String, required: true, maxLength: 100},
    artist: {type:Schema.Types.ObjectId, required: true, ref: "Artist"},
    album: {type:Schema.Types.ObjectId, required: true, ref: "Album"},
    genre: [{type:Schema.Types.ObjectId, ref: "Genre"}],
    favorite_lyric: {type: String, required: true, maxLength: 100},
});

SongSchema.virtual("url").get(function() {
    return `/song/${this._id}`;
})

module.exports = mongoose.model("Song", SongSchema);
