const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
    title: {type: String, required: 'true'}
})

PlaylistSchema.virtual('url').get(function() {
    return `/home/playlists/${this._id}`;
})

module.exports = mongoose.model('Playlist', PlaylistSchema);