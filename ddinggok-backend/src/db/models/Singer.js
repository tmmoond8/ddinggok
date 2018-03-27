const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const util = require('lib/util');

const Singer = new Schema({
  name: String,
  // name: { type: String, unique: true},
  displayName: String,
  images: []
});

Singer.statics.createSinger = function({name, displayName}) {
  const singer = new this({
    name,
    displayName,
    images: []
  });
  return singer.save();
}

Singer.statics.findByName = function(name) {
  return this.findOne({name});
}

Singer.methods.addSong = function(image) {
  const { images, name } = this;
  images.push({
    filename: name + util.makeRandomString(),
    base64: 'sdffdsfsfdsfas'
  });
  return this.save();
}

module.exports = mongoose.model('Singer', Singer);