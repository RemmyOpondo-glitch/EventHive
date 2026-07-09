const express = require("express");

const router = express.Router();

router.get("/dashboard",(req,res)=>{

    if(!req.session.user){
        return res.redirect("/login");
    }    

    res.render("dashboard",{
        user: req.session.user
    });
});

module.exports = router;