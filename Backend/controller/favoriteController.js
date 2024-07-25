import Favorite from "../model/favorite.js";
export const getFavorites=async(req,res)=>{
    try {
        const favorites=await Favorite.find();
        res.status(200).json(favorites);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const addFavorite=async(req,res)=>{
    const favorite=req.body;
    const newFavorite=new Favorite(favorite);
    try {
        await newFavorite.save();
        res.status(201).json(newFavorite)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const deleteFavorite = async (req, res) => {
    const { id } = req.params;  // Use id here
    try {
        const result = await Favorite.findByIdAndDelete(id); // Use id here
        if (result) {
            res.status(200).json({ message: 'Favorite card deleted successfully' });
        } else {
            res.status(404).json({ message: 'Favorite card not found' });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
