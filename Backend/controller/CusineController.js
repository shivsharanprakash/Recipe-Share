import Cusine from "../model/Cusine.js";
export const getCuisine = async (req, res) => {
    try {
        const cuisines = await Cusine.find().lean();
        res.status(200).json(cuisines); 
    } catch (error) {
        console.error("Error:", error); 
        res.status(500).json({ error: "Internal Server Error" }); 
    }
};
