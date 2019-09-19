const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const config = require('../../config/config');
// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});
router.route('/checkUser').get((req, res) => {
    User.find((err, data) => {
        if (err)
            res.json({ success: false, msg: 'Failed to get Data' });
        else
            res.json({ success: true, data: data });
    });
});
// change password
router.put('/changePassword/:id', (req, res) => {
    User.getUserById(req.params.id, (err, data) => {
        if (!data) {
            return next(new Error({ 'message': 'Could not load document', code: '1' }));
        }
        User.comparePassword(req.body.oldPassword, data.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                for (let key in data) {
                    if (req.body.hasOwnProperty(key)) {
                        data[key] = req.body[key]
                    }
                }
                User.addUser(data, (err, user) => {
                    if (err) {
                        res.json({ success: false, msg: 'Password cannot be updated' });
                    } else {
                        res.json({ success: true, msg: 'Password updated Successfully' });
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});
router.post('/authenticate', (req, res, next) => {
    // res.json({ 'data': 'Authenticated successfully' })
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secretKey, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    User.find((err, data) => {
        if (err)
            res.status(400).json({ success: false, user: 'unauthorized' });
        else
            res.status(200).json({ success: true, user: req.user });
    });
});

module.exports = router;