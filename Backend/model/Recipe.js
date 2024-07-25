import mongoose from 'mongoose';
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  image: { type: String, required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: false },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
