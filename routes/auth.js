const fs = require("fs");

const express = require("express");
const { log } = require("console");

const router =express.Router();

//Login page
router.get("/login",(req,res)=>{
    res.render("login");
});

router.post("/login", (req, res) => {

    const users = JSON.parse(
        fs.readFileSync("./data/users.json")
    );

    const user = users.find(
        user => user.email === req.body.email
    );

    if (!user) {
        return res.send("Email not found.");
    }

    if (user.password !== req.body.password) {
        return res.send("Incorrect password");
    }

    req.session.user = user;

    console.log("User saved:", req.session.user);
    console.log("Session after save:", req.session);

    req.session.save((err) => {
        if (err) {
            console.error(err);
            return res.send("Session save failed");
        }

        res.redirect("/dashboard");
    });
});

//logout
router.get("/logout",(req,res)=>{
    req.session.destroy(()=>{
        
        res.redirect("/login");

    });
});

//Register page
router.get("/register",(req,res)=>{
    res.render("register")
})

router.post("/register",(req,res)=>{

    const users = JSON.parse(
        fs.readFileSync("./data/users.json")
    ); //JSON.parse():converts JSON ➜ JavaScript

    const existingUser = users.find(user=>
        user.email===req.body.email
    );

    if(existingUser){
        return res.send('Email already  registered')
    };

    users.push(req.body);

    fs.writeFileSync("./data/users.json",
        JSON.stringify(users, null, 2) ////tells JavaScript to indent the JSON using 2 spaces
    );

    res.send("Registration received");
    
});

module.exports= router;