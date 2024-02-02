const express = require('express');
const router = express.Router();
const { authRequired } = require('./util');
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')
const { postLogin, getAllUsers, getUserByUsername, createUser, updateUser, deleteUser } = require('../db/sqlHelperFunctions/users');

router.get('/', async (req, res, next) => {
    try {
        const user = await getAllUsers();
        res.send(user);
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const token = await postLogin(req.body);
        
        res.cookie("token", token, {
		    sameSite: "strict",
		});
        res.send({ token });
    } catch (error) {
        next(error);
    }
});

// add 404 if no usre anf 403 wrong password 

router.get('/me',authRequired, async (req, res, next) => {
    try {
        const token = req.get('Authorization').split(' ')[1];
        decoded = jwt.verify(token, JWT_SECRET)
        console.log(decoded)
        const user = await getUserByUsername(decoded.username);
        res.send(user);
    } catch (error) {
        next(error);
    }
});


router.post('/', async (req, res, next) => {
    try {
        const token = await createUser(req.body);
        
        res.cookie("token", token, {
		    sameSite: "strict",
			signed: true,
		});
        res.send({ token });
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        res.send(user);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const user = await deleteUser(req.params.id);
        res.send(user);
    } catch (err) {
        next(err);
    }
});

module.exports = router;