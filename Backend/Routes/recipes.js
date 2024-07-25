import express  from 'express';
const router =express.Router();
import Recipe from '../model/Recipe.js';
import authMiddleware from '../middleware/auth.js'
router.post('/', authMiddleware, async (req, res) => {
    const { title, ingredients, instructions, image, name } = req.body;
    const userId = req.user.userId;
  try {
      const newRecipe = new Recipe({
        title,
        ingredients,
        instructions,
        image,
        userId,
        name,
      });
      await newRecipe.save();
      res.status(201).json({ message: 'Recipe shared successfully', recipe: newRecipe });
    } catch (error) {
      console.error('Error sharing recipe:', error);
      res.status(500).json({ error: 'Failed to share recipe' });
    }
  });

router.get('/',authMiddleware,async(req,res)=>{
    try {
        const recipes=await Recipe.find();
        res.json({recipes});
    } catch (error) {
        res.status(500).json({ message: err.message });  
    }
});


 
export default router;