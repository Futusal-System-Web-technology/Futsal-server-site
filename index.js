const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectToServer } = require("./utilis/dbConfig");
const app = express();
const port =  5000;

//middleware
app.use(cors());
app.use(express.json());

connectToServer((err)=>{
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    })  
    // console.log(err);
})

const userRouter = require('./src/modules/Users/user.router')


app.use('/api/v1/users/',userRouter)

app.get("/", (req, res) => {
    res.send("Hello World");
});
  
  