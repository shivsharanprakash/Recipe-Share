import express from 'express';
const router=express.Router();
import Recipe from '../model/Recipe';
router.post('/rate/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const{rating}=req.body;
        const recipe=await Recipe.findById(id);
        if(!recipe){
            return res.status(404).json({message:'Recipe not found'});
        }
        recipe.rating=rating;
        await rec4.save();
        res.status(200).json({message:'Rating updated successfully ',recipe});
    } catch (error) {
        res.status(500).json({ message: 'Error updating rating', error });
    }
});

router.get('/', (req, res) => {
    res.status(404).json({ message: 'Endpoint not defined' });
});

export default router;