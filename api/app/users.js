const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({message: 'No token present!'});
    }

    try {
        const user = await User.findOne({token});

        if (!user) {
            return res.status(401).send({message: 'Wrong token!'});
        }

        const users = await User.find({username: {$ne: user.username}});

        if (!users) {
            return res.status(404).send({message: 'Users not found!'});
        }

        res.send(users);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', async (req, res) => {
    try{
        const userData = {
            username: req.body.username,
            password: req.body.password
        };
        const user = new User(userData);

        user.generateToken();
        await user.save();

        res.send(user);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            return res.status(401).send({message: 'Credentials are wrong!'});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            return res.status(401).send({message: 'Credentials are wrong!'});
        }

        user.generateToken();
        await user.save({validateBeforeSave: false});

        res.send({message: 'Username and password correct!', user});
    } catch (e) {
        res.status(400).send(e);
    }
});


router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save({validateBeforeSave: false});

    return res.send({success, user});
});

module.exports = router;