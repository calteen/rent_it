const express = require("express");
const router = express.Router();
const { check, body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Userdb = require("../models/user.model");
// let sitedomain = ".example.com:300"


router.post("/register", async (req, res) => {

console.log(req.body);



    const phone = req.body.phone;
    const password = req.body.password;
    phonedb = 0;
    try {
      phonedb = await Userdb.findOne({ phone: phone });
    } catch (error) {
    }
    

    if (phonedb) {
      console.log(phonedb);
      return res.json({ errorMessage: 'phone already in use' })
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      // console.log(hashedPassword);
      const user = new Userdb(
        {
          phone: phone,
          password: hashedPassword
        }
      )
      const registered = await user.save();


      return res.json({regester:"success",token:registered._id,phone: phone});
    }
    catch (err) {
      return res.send(err)
    }
  });
router.post("/login",
  async (req, res) => {

try {
 
      const phone = req.body.phone;
      const password = req.body.password;

      console.log(req.body);
      const phonedb = await Userdb.findOne({ phone: phone });
      console.log(phonedb);
      if (phonedb) {
        const result = await bcrypt.compare(password, useremail.password);
        console.log('success1', result)
          
        if (result) {

          console.log('success')
          
          return res.json({status:"success",id:phonedb._id});
        } else {
          
          return res.status(422).json( {
            errorMessage: "Incorrect Password",
            doctitle:"login"
          })
        }

      }
      if (!useremail) {
        // return res.send('email not found')
        return res.status(422).json( {
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
