var express = require("express")
var app = express()

// app.use(require("./logger.js"))

// app.get("/", (req, res)=> {
//     res.status(200).send("Hello World.");
// })

// app.get("/home/index", (req, res) => {
//     res.status(200).send("ok");
// })

// app.get("/user/:id*", (req, res) => {
//     console.log(req.params.id);
//     res.status(200).send("ok")
// })

app.use("/user", require("./user.js"));


app.listen(3000);