import User from '../models/User.js';
import bcrypt from 'bcrypt';
import generateAccessToken from '../utils/accessToken.js';
import generateRefreshToken from '../utils/refreshToken.js';
import validator from 'validator';

class authController {
    async registration(req, res) {
        try {
            const { username, password } = req.body;
            const candidate = await User.findOne({ username });

            if (candidate) {
                return res.status(400).json({ message: "User with this username already exists" });
            }

            if (!validator.isEmail(username)) {
                return res.status(401).json({ message: "Email is not valid" });
            }

            const hashPassword = await bcrypt.hash(password, 7);
            const user = await User.create({ username,password: hashPassword });

            return res.status(201).json({ message: "User was created", user });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const candidate = await User.findOne({ username });

            if (!candidate) {
                return res.status(401).json({ message: "No user with this username" });
            }

            const match = await bcrypt.compare(password, candidate.password);

            if (match) {
                const accessToken = generateAccessToken(candidate);
                const refreshToken = generateRefreshToken(candidate);

                return res.json({ accessToken, refreshToken });
            } else {
                return res.status(401).json({ message: "Incorrect password" });
            }
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }
}

export default new authController();
