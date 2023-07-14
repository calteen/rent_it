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
      return res.json({ errorMessage: 'not able to find in'})
    }
    

    if (phonedb) {
      console.log("phone db",phonedb);
      return res.json({ errorMessage: 'phone already in use' });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      // console.log(hashedPassword);
      const user = new Userdb(
        { name: "unknown";
          phone: phone,
          password: password
        }
      )
      const registered = await user.save();

          console.log("return",registered._id)
      return res.json({regester:"success",token:registered._id,phone: phone});
    }
    catch (err) {
      console.log("err",err);
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
        console.log('success01')
      
        console.log('success1', password == phonedb.password)
          
        if (password == phonedb.password) {

          console.log('success')
          
          return res.json({status:"success" ,token:phonedb._id,phone: phonedb.phone});
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
