const express = require("express");
const fs = require("fs");
const { arrayBuffer } = require("stream/consumers");
const { queryObjects } = require("v8");

const router = express.Router();


router.get("/create-event", (req, res) => {

    
    if (!req.session.user) {
        return res.redirect("/login");
    }

    res.render("create-event");
});

router.post("/create-event",(req,res)=>{

    const events= JSON.parse(
        fs.readFileSync("./data/events.json")
    );
    //fs.readFileSync() reads the file.
    //JSON.parse converts the JSON text into a JavaScript array.

    
    events.push(req.body);
    //push() always adds a new item to the end of an array.

    fs.writeFileSync(
        "./data/events.json",//This tells Node.js which file to write to.
        JSON.stringify(events,null,2)//converts the JavaScript array back into JSON text before saving it
    );

    res.redirect("/events")
})

//accesing and displayng the events.json

router.get("/events",(req,res)=>{
    if(!req.session.user){
        return res.redirect("/login");
    }

    const events=JSON.parse(
        fs.readFileSync("./data/events.json")
    );

    res.render("events",{
        events:events
    });
});

//to edit and update events
router.get("/edit-event/:id",(req,res)=>{
    
    if(!req.session.user){
        return res.redirect("/login");
    }

    const events=JSON.parse(
        fs.readFileSync("./data/events.json")
    )

    const id= req.params.id; //To Get the Event Index

    const event = events[id]; //To Get the Correct Event

    res.render("edit-event",{
        event:event,
        id:id
    });
});

router.post("/edit-event/:id", (req,res)=>{

    const events = JSON.parse(
        fs.readFileSync("./data/events.json")
    );

    const id =req.params.id;

    events[id]=req.body;

    fs.writeFileSync("./data/events.json", 
       JSON.stringify(events, null, 2) 
    );

    res.redirect("/events")
});

//delete route
router.post("/delete-event/:id",(req,res)=>{
    const events =JSON.parse(
        fs.readFileSync("./data/events.json")
    );

    const id = req.params.id;

    //removing the event
    events.splice(id,1);

    fs.writeFileSync("./data/events.json",
        JSON.stringify(events,null,2)
    )

    res.redirect("/events")
});


module.exports = router;

/* events.ejs notes
  //<% %>:Runs JavaScript without displaying anything.This starts the loop.
  <%= %>:Runs JavaScript and prints the result. */
 
/* common objects
req.body>>Comes from an HTML form
req.session>>Comes from Express Session.
req.params>>Comes from the URL. */

//<%events.forEach((event, index)=>{%>>> used to give an index as of the array as the code loops through it

/* when we want to delete an event we use form with a delete button instead of an anchor link like when we 
wantend to edit an iten, this is because Editing only opens a page, so it uses a GET request whereas 
Deleting changes data, so it should use a POST request. */

/* we use the splice to delete items in an array
e.g splice(1,1)
the slice is composes as >>splice(start, numberToRemove) */