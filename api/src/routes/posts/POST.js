const server = require("express").Router();
const { Posts } = require("../../db");

server.post("/", async (req, res) => {

    const { name, description } = req.body

    console.log(name, description)

    try {

        const newPost = await Posts.create({            
                name,
                description            
        });

        res.json(newPost)

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, status: 500 });
    }
});

module.exports = server;
