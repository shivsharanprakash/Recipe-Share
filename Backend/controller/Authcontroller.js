import Author from "../model/Author.js";
export const getAuthor = async (req, res) => {
    try {
        const authors = await Author.find().lean();
        res.json(authors);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
