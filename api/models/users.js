import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/bomber');

let Schema = mongoose.Schema;

let User = new Schema({
  facebook_id: String,
  name:  String,
  picture: String,
  youtube: Boolean,
  mercs: []
});

export default mongoose.model('User', User);
