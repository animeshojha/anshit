const express = require("express")
const routers = require("./routes/user-routes")
const mongoose = require("mongoose");
const bodyparser = require('body-parser');
const blogRouter  = require("./routes/blog-routes");
const app = express();


app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use("/api/user", routers);
app.use("/api/blog",blogRouter);
app.use(express.json());
express.urlencoded({ extended: true })
mongoose
  .connect(
    "mongodb+srv://animeshojha44:Animesh%40123@cluster0.ifjy27u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => app.listen(5000))
  .then(() =>
    console.log("connected to database and listening to local host of 5000")
  )
  .catch((err) => console.log(err));
