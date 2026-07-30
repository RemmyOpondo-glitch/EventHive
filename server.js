const express = require("express");

const session = require('express-session');

const app = express();

const port =3002;

const indexRoutes=require("./routes/index");
const authRoutes=require("./routes/auth");
const eventsRoutes=require("./routes/events");
const dashboardRoutes=require("./routes/dashboard");
const footerRoutes= require("./routes/partials")


app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));//translator witjout it Express can't understand the form data.

app.use(
    session({
        secret: "eventhive-secret",
        resave: false,
        saveUninitialized: false
    })
);


app.use("/",indexRoutes);
app.use("/",authRoutes);
app.use("/",eventsRoutes);
app.use("/",dashboardRoutes);
app.use("/",footerRoutes);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})




