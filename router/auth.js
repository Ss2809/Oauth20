const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/google",
  passport.authenticate("google", { scope:["profile","email"] })
);


router.get("/google/callback",
  passport.authenticate("google", { session:false }),
  (req,res)=>{
   // console.log("USER:", req.user);   // should show user
    if(!req.user) return res.send("User missing");

    const token = jwt.sign({ id:req.user._id },process.env.key, { expiresIn:"1d" });
    res.redirect(`http://localhost:5000/success.html?token=${token}`);
  }
);



module.exports = router;
