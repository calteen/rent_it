const express = require("express");
const router = express.Router();
const { check, body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Userdb = require("../models/user.model");
// let sitedomain = ".example.com:300"


router.post("/register", async (req, res) => {


  console.log(req.body)
  res.json({a:"succ"});
  });
router.post("/login",
  async (req, res) => {

try {
 
      const email = req.body.email.toLowerCase();
      const password = req.body.password;

      const useremail = await Userdb.findOne({ email: email });
      if (useremail) {
        const result = await bcrypt.compare(password, useremail.password);
        if (result) {
          const token = await useremail.generateAuthToken();
       
          res.cookie("id", registered._id, {
            expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)),
            httpOnly: true
          })
          
          return res.json({status:"success",id:registered._id});
        } else {
          
          return res.status(422).render('auth', {
            errorMessage: "Incorrect Password",
            doctitle:"login"
          })
        }

      }
      if (!useremail) {
        // return res.send('email not found')
        return res.status(422).render('auth', {
          errorMessage: "User does not exist",
          doctitle:"login"
        })
      }






    }
    catch (err) {
      return res.send(err)
    }
  });
router.get("/logout", async (req, res) => {

  res.clearCookie("id")
  return res.json({status:'success'})

});


module.exports = router;
