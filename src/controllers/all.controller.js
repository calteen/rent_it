const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')

const authController = require("./auth.controller");
const postController = require("./post.controller.js");
const userController = require("./user.controller.js");


router.use("/post", postController);
router.use("/user",userController);

router.get("/",(req,res)=>{
    console.log('//////////////////////////////////////////////////got a faltu req')
    res.json({a:'a'});
});



module.exports = router;