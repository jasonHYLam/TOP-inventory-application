const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    name: {type: String, required: true, maxLength: 100}
})

AlbumSchema.virtual("url").get(function() {
    return `/home/albums/${this._id}`;
})

module.exports = mongoose.model("Album", AlbumSchema);