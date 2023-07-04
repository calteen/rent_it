const express = require("express");
const router = express.Router();
const Userdb = require("../models/user.model");
const Postdb = require("../models/pin.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const path = require("path")
const fileUpload = require("express-fileupload");
const fs = require('fs');




let fileuploader = (d)=>{
   file = d;
  // console.log(file);
  // 
  filename = `${Date.now()}-${Math.floor(10000000 + Math.random() * 90000000)}` +file.name
  //  p = __dirname + "\\..\\..\\uploads\\" +filename;
p = path.join(__dirname, '..','..', 'uploads', filename)

  file.mv(p, (err) => {
    if (err) {
     return 0
    }
    // console.log("==>filename",filename,"p",p);
 return filename
  });
  
  

  return filename
}

let filedelete = (d)=>{

  console.log(">>delete file function")
  p = path.join(__dirname, '..','..', 'uploads', d)
  console.log(p)
  fs.unlink(p,function(err){
    console.log('done deleting')
    if(err){
      console.log(err);
      return ;
    } 
    console.log('file deleted successfully'+d);
});  

}



router.post("/addpin",auth,async (req, res) => {




images = []
  if(req.files){

    try {
      images = []
    for(let x = 0; x < req.files.images.length;x++){
    data = await s3fileuploader(req.files.images[x]);
    images[x] = data
    }
    } catch (error) {
      
    }
    
    
    
     }else{
     
     }


if(!req.body.userid){
  return res.json({msg:'no user found'})
}





const newpost = new Postdb({
user:req.body.userid,
title:req.body.title,
price:req.body.price,
description:req.body.about,
images:images,
  })

  await new Promise(resolve => setTimeout(resolve, 1000));

  newpost.save().then((post) => {
  




  return res.json({status:'success'})
}
  )
.catch(err =>res.json(err))
});

  
router.delete("/:id",auth, async (req, res) => {
    console.log('delete id',req.params.id)
      if(!req.body.userid){
        return res.json({msg:req.body.userid,msg2:'not allowed'})
      }
      try {
        Postdb.findById(req.params.id)
        .then(post =>{
    //check for post owner;
  
  if(post.user.toString() !== req.body.userid.toString()){
      return res.json({ notauthorised:'access denied'})
    }
    //delete post

    try {

      
  for(x = 0; x < post.images.length; x++){
    filedelete(post.images[x]);

  }

  
    } catch (error) {
      
    }

    post.remove().then(()=>{

    return res.json({success:'true'})
    })
        }).catch((e)=>{
          return res.json({postnotfound:"post not found"})
        })
    
    
      } catch (error) {
        return res.json({error})
      }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        });


router.post("/update/:id",auth, async (req, res) => {
          console.log('../',req.files)
        
        console.log('====>',req.body.title,req.body.txt,req.params.id)
        
          if(!req.body.userid){
            return res.json({msg:req.body.userid,msg2:'not allowed'})
          }
          if(!req.body){
            return res.send({ message : "Data to update can not be empty"})
        }
        
         try {
          const post = await Postdb.findById(req.params.id)
        
        
          if(!post){
            return res.json({postnotfound:"post not found"})
          }
          let updated_data = post
          updated_data.title = req.body.title
          updated_data.about = req.body.about
          updated_data.platform = req.body.platform
        updated_data.ytLink = req.body.ytLink
        
          if(req.files){
        
        
        try {
          console.log('gamefile1')
          gameFile = await gfs3fileuploader(req.files.gameFile)
          console.log('gamefile2')
          updated_data.gameFile = gameFile
          gfs3filedelete(post.gameFile)
          console.log('gamefile3')
        } catch (error) {
          console.log('gamefileerr')
        }
        
        try {
          
        
        logo = await s3fileuploader(req.files.logo)
        console.log('deleting update logo')
        s3filedelete(post.logo)
        updated_data.logo = logo
        console.log('logo', logo)
        } catch (error) {
          console.log('logo error', error)
        }
        
        try {
          
        thumbnail = await s3fileuploader(req.files.thumbnail)
        s3filedelete(post.thumbnail)
        console.log('++++++++++++>',thumbnail)
        updated_data.thumbnail = thumbnail
        } catch (error) {
          
        }
        
        try {
          images = []
        
        for(let x = 0; x < req.files.images.length;x++){
        
        data = await s3fileuploader(req.files.images[x]);
        
        images[x] = data
        }
        
        for(x = 0; x < post.images.length; x++){
          s3filedelete(post.images[x]);
        
        }
        
        updated_data.images = images
        } catch (error) {
          
        }
        
        
        
         }else{
         
         }
        
        
        
        
        
        
        
        
        
        
        
        
          if(post.user.toString() == req.body.userid.toString()){
          await post.updateOne({$set:updated_data})
        
          await new Promise(resolve => setTimeout(resolve, 1000));
        
          return res.redirect('/dashboard/update-post?id='+req.params.id)
          }else{
            return res.json({ notauthorised:'access denied :- not by owner'})
          }
        
         
          } catch (error) {
        return res.json({err:error})
        }
             });

         
router.get("/fetch", async (req, res) => {
          post = '';
            try {
               post = await  Postdb.find({})
           } catch (error) {
              return res.json({err: error,msg:'/fetch not found'})
            }
        
          return res.json(post)
          
        
        
          });



router.get("/fetch/:id", async (req, res) => {
          post = '';
          username= ""
            try {
               post = await  Postdb.findById(req.params.id)
               username= await Userdb.findById(post.user);
               console.log(post.username);
        
            } catch (error) {
              return res.json({err: error,msg:'no post with that id found'})
            }
        
          return res.json(post)
          
        
        
          });





router.post("/formtemp",async (req, res) => {
  console.log(req.body);
const newpost = new Postdb({
            user:"none",
            title:req.body.title,
            price:req.body.price,
            description:req.body.description,
            long: req.body.long,
            lat: req.body.lat,
            phone:req.body.phone
              })
       


              await new Promise(resolve => setTimeout(resolve, 1000));
            
              newpost.save().then((post) => {
            return res.json({status:'success'})
            }
              )
            .catch(err =>res.json(err))
            });
            
              



    
module.exports = router;
