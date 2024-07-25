import mongoose from "mongoose";
const CardSchema=mongoose.Schema({
    title: String,
    image: String,
    description: String,
    author: String,
    link: String,
    rating:Number,
    rating: Number,
    favorite: {
      type: Boolean,
      default: false
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true,
  },
    
});

const Card = mongoose.model("Card", CardSchema);
export default Card;
