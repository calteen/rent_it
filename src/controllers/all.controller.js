const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')

const authController = require("./auth.controller");
const pinController = require("./pin.controller.js");


router.use("/pin", pinController);
// router.use("/auth",authController);

router.get("/",(req,res)=>{
    res.json({rent_it_status:'Live'});
});



module.exports = router;