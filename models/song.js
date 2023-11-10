const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SongSchema = new Schema({
    title: {type: String, required: true, maxLength: 100},
    link: {type: String, maxLength: 100},
    artist: {type: String, maxLength: 100},
    album: {type: String, maxLength: 100},
    genre: [{type:Schema.Types.ObjectId, ref: "Genre"}],
    playlist: [{type:Schema.Types.ObjectId, ref: "Playlist"}],
});

SongSchema.virtual("url").get(function() {
    return `/home/songs/${this._id}`;
})

module.exports = mongoose.model("Song", SongSchema);
