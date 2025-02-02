const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors")
const cookieParser = require('cookie-parser');
const connectToDb = require("./db/db");
const app = express();
const userRoutes = require("./routes/user.routes");


app.use(cors()) // yahan pe abhi hm cors mein kuch data pss nhi kr rhe jb main deploy karoonga tb isme kuch data pss kr doonga
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// yahan se Db connect function ko call krte h 
connectToDb();



app.get("/", (req, res) => {
    res.send("Hello Kaise ho saare")
})

app.use('/users',userRoutes)


module.exports = app;