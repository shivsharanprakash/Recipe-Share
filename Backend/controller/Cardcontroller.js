import Card from '../model/Card.js';
export const getCards = async (req, res) => {
    try {
        const cards = await Card.find().populate('recipe').lean();
        res.json(cards);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
