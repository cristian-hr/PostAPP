const server = require("express").Router();
const { Posts } = require("../../db");

server.get("/", async (req, res) => {

    try {

        const allPosts = await Posts.findAll();

        res.json(allPosts)

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, status: 500 });
    }
});

server.get("/:name", async (req, res) => {

    const { name } = req.params

    try {

        const allPosts = await Posts.findAll({
            where: {
                name
            }
        });

        res.json(allPosts)

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, status: 500 });
    }
});

module.exports = server;
