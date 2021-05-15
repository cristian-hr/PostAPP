const server = require("express").Router();
const { Posts } = require("../../db");

server.delete("/", async (req, res) => {

    const { id } = req.body

    try {

        const deletedPost = await Posts.findOne({
            where: {
                id:id
            }
        });

        await Posts.destroy({
            where: {
                id
            }
        })

        if (!deletedPost) res.status(401).json({message: "Post not found"})
        else res.json(deletedPost)

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, status: 500 });
    }
});

module.exports = server;
