const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {type: String, required: true, maxLength: 100}
})

ArtistSchema.virtual("url").get(function() {
    return `/artists/${this._id}`;
});