require("dotenv").config();
require("./config/passport");
const express = require("express")
const app = express();
const auth = require("./router/auth");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

const connectDB = require("./db");

connectDB(); 

app.use("/auth", auth);

app.listen(5000, ()=>console.log(`server running ${5000}`))