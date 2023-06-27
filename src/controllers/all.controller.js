const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')

const authController = require("./auth.controller");
const postController = require("./post.controller.js");


router.use("/post", postController);
router.use("/auth",authController);

router.get("/",(req,res)=>{
    res.json({rent_it_status:'Live'});
});



module.exports = router;