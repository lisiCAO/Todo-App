const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const { db } = require('../models/index');

exports.getMe = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const user = await db.user.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            return res.status(404).send('The user does not exist.');
        }
        return res.status(200).send({ user: user });
    } catch (error) {
        next(error);
    }
};

exports.register = async (req, res) => {
    try {
        const existingUser = await db.user.findOne({ where: { email: req.body.email } });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await db.user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        if (!user.name || !user.email || !user.password) {
            return res.status(400).json({ error: 'Please fill out all fields' });
        }

        res.status(201).send({ userId: user.id });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errorMessages = error.errors.map((err) => err.message);
            return res.status(400).json({ error: errorMessages });
        }
        res.status(500).send('Error registering new user');
    }
};

exports.login = async (req, res) => {
    try {
        const user = await db.user.findOne({ where: { email: req.body.email } });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); 
            res.send({ email: user.email });
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Error logging in user');
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.sendStatus(200); 
};
