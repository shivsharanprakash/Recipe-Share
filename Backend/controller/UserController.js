import User from '../model/User.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
const jwtSecret = "Heythisispakashshivsharan";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashPassword = await bcryptjs.hash(password, 10);

        const createUser = new User({
            name,
            email,
            password: hashPassword,
        });
        await createUser.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log('Error:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Enter Valid Credentials" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Enter Valid Credentials" });
        }
        const payload = { userId: user._id };
        const authToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({
            message: "Login successfully",
            user: {
                _id: user.id,
                name: user.name,
                email: user.email
            },
            authToken
        });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getUserProfile = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Correctly extract the token
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findById(decoded.userId).select('-password');  // Ensure the field matches with the payload
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};