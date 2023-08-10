const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./db");
mongoDB();
const cors = require("cors")


app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("hello backend");
});
// app.use((req,res,next)=>{
//  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//  res.header(
//     "Access-Control-Allow_headers",
//     "Origin, X-Requested-With, Content-type, Accept"
//  );
//  next();
// })

// API middleware----------------

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});




// const express = require("express");
// const app = express();
// const cors = require("cors");

// const User = require("./User");
// require('./config');


// app.use(cors());
// app.use(express.json());


// app.post("/register", async (req, resp) => {
//     let user = new User(req.body);
//     let result = await user.save()
//     resp.send(result);
//     // console.log(result);
// });



// app.listen(5000);