const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors")
const connectToDb = require("./db/db");
const app = express();

app.use(cors()) // yahan pe abhi hm cors mein kuch data pss nhi kr rhe jb main deploy karoonga tb isme kuch data pss kr doonga

// yahan se Db connect function ko call krte h 
connectToDb();



app.get("/", (req, res) => {
    res.send("Hello Kaise ho saare")
})


module.exports = app;