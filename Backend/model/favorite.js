import mongoose from 'mongoose';

const FavoriteSchema = mongoose.Schema({
  title: String,
  image: String,
  description: String,
  author: String,
  link: String,
  rating: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ,
  
});
const Favorite = mongoose.model('Favorite', FavoriteSchema);
export default Favorite;
