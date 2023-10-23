import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

import Token from '../model/token.js';
import User from '../model/user.js';

// dotenv.config();

export const signupUser = async (request, response) => {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    try {
        const user = {
            username: request.body.username,
            name: request.body.name,
            phone: request.body.phone,
            email: request.body.email,
            password: hashedPassword,
        };

        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({ msg: 'Signup success' });
    } catch (error) {
        return response
            .status(500)
            .json({ msg: 'Error while signing up user' });
    }
};

export const signupAdmin = async (request, response) => {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    let user;
    try {
        if (request.body.key === process.env.SECRET_KEY) {
            user = {
                username: request.body.username,
                name: request.body.name,
                phone: request.body.phone,
                email: request.body.email,
                password: hashedPassword,
                admin: true,
            };
            const newUser = new User(user);
            await newUser.save();

            return response.status(200).json({ msg: 'Signup success' });
        } else {
            return response.status(400).json({ msg: 'admin key is wrong' });
        }
    } catch (error) {
        return response.status(500).json({ msg: 'error while sign up' });
    }
};

export const loginUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(
                user.toJSON(),
                process.env.ACCESS_SECRET_KEY,
                { expiresIn: '24h' }
            );
            const refreshToken = jwt.sign(
                user.toJSON(),
                process.env.REFRESH_SECRET_KEY
            );

            const newToken = new Token({ token: refreshToken });
            await newToken.save();

            response.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
                name: user.name,
                username: user.username,
                admin: user.admin,
                avatar: user.avatar,
            });
        } else {
            response.status(400).json({ msg: 'Password does not match' });
        }
    } catch (error) {
        response.status(500).json({ msg: 'error while login the user' });
    }
};

export const logoutUser = async (request, response) => {
    const token = request.params.token;
    await Token.deleteOne({ token: token });

    response.status(204).json({ msg: 'logout success' });
};

export const getAllUser = async (req, res) => {
    try {
        const allUsers = await User.find({});

        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.find({ username: req.params.username });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const editUser = async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { username: req.body.username },
            { $set: req.body }
        );
        res.status(200).json('success');
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteUser = async (request, response) => {
    try {
        await User.deleteOne({ _id: request.params.id });

        response.status(200).json('success delete');
    } catch (error) {
        response.status(500).json(error);
    }
};
