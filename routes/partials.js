const express = require ("express");

const router = express.Router();

router.get("/footer",(req,res)=>{
    res.render("footer")
})



module.exports=router