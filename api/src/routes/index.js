const { Router } = require('express');
const router = Router();

router.use("/post", require("./posts/GET"));
router.use("/post", require("./posts/POST"));
router.use("/post", require("./posts/DELETE"));

module.exports = router;
