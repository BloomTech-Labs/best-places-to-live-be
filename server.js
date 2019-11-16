const express = require('express');
//Security Imports
const cors = require('cors');
const helmet = require('helmet');
const passport = require("passport");
//Auth not set up how I would like it done but I'm going to leave it for now so that we don't get any bugs in testing. 
//Plan is to have this better organized to my liking by v5
const authenticate = require('./routes/auth');
const users = require("./routes/users");
const auth = require("./routes/auth");
const city = require("./routes/city");
const profile = require("./routes/profile");
//Still not sure what keys are doing 
const keys = require("./config/keys");
const server = express();

server.use(helmet())
server.use(express.json());
server.use(cors());



server.use(passport.initialize());
server.use(passport.session());
//Routes
server.use("/city", city);
server.use("/users", users);
server.use("/auth", auth);
server.use("/profile", profile);
//Informs devs that this is working
server.get('/', (req, res) => {
    res.send("<h1>Let's Move Homie is a terrible name</h1>")
})

module.exports = server; 