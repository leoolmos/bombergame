import mongoose from 'mongoose';

mongoose.connect('mongodb://leoolmos:galicia@ds153682.mlab.com:53682/bomber');

let Schema = mongoose.Schema;

let User = new Schema({
  facebook_id: String,
  name:  String,
  picture: String,
  youtube: Boolean,
  mercs: []
});

export default mongoose.model('User', User);
