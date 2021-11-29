// BUILD YOUR SERVER HERE
// IMPORTS AT THE TOP
const express = require('express');
const User = require('./users/model');

// INSTANCE OF EXPRESS APP
const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json()); 

// ENDPOINTS 
// [GET] /api/users
server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ 
            message: "The users information could not be retrieved",
            error: err.message
        })
    }
})

// [GET] /api/users/:id
server.get('/api/users/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist",
            })
        } else {
            res.json(user)
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be retrieved",
            error: err.message
        })
    }
})

// [POST] /api/users
server.post('/api/users', async (req, res) => {
    try{
        // pull user info from req.body
        // use User.insert with req.body
        // send back to client the new user
        if (!req.body.name || !req.body.bio){
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            const newUser = await User.insert(req.body);
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({
            message: "There was an error while saving the user to the database",
            error: err.message
        })
    }
})

// [DELETE] /api/users/:id
server.delete('/api/users/:id', async (req, res) => {
    try{
        const deletedUser = await User.remove(req.params.id)
        if(!deletedUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist",
            })
        } else {
            res.json(deletedUser)
        }
    } catch (err) {
        res.status(500).json({
            message: "The user could not be removed",
            error: err.message
        })
    }
})

// [PUT] /api/users/:id
server.put('/api/users/:id', async (req, res) => {
    try{
        const updated = await User.update(req.params.id, req.body)
        if(!updated) {
            res.status(404).json({
                message: "The user with the specified ID does not exist",
            })
        } else if(!req.body.name || !req.body.bio){
            res.status(400).json({
                message: "Please provide name and bio for the user"
            }) 
        } else {
            res.status(201).json(updated);
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be modified",
            error: err.message
        })
    }
})

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server; // EXPORT YOUR SERVER
