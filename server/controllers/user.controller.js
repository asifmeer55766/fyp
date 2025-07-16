const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST /api/register
const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }

        // Check if email exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'Registration successful' });

    } catch (err) {
        next(err);
    }
};




// POST /api/login
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Invalid email or password' });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

        // Generate token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    registerUser,
    loginUser
};

