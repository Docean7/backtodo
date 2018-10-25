const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

module.exports = {
    async create(req, res) {
        const {username, password, email} = req.body;
        let user = await User.findOne({where: {username}});
        if (!user) {
            const passwordHash = await bcrypt.hash(password.trim(), saltRounds);
            const createdUser = await User.create({
                username: username.trim(),
                password: passwordHash,
                email: email.trim()
            }).then(user => user.get({plain: true}));
            const token = jwt.sign({
                    id: user.id,
                    role: 'user'
                },
                'secret',
                {
                    expiresIn: '1d'
                });
            console.log(token);
            res.status(201).json(token);
        } else {
            console.log(`User ${user} exists`);
            res.status(400).send('User with this username is already registered')
        }
    },

    async auth(req, res) {
        const plainPass = req.body.password.trim();
        let user = await User.findOne({
            where: {username: req.body.username.trim()}
        }).then(user => user.get({plain: true}));
        const match = await bcrypt.compare(plainPass, user.password);
        if (match) {
            const token = jwt.sign({
                    id: user.id,
                    role: 'user'
                },
                'secret',
                {
                    expiresIn: '1d'
                });
            res.status(200).json(token)
        } else {
            res.status(400).send('Wrong username or password');
        }
    }
};