const express = require("express");
const cors = require('cors')
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 3001;

const app = express();
var jsonParser = bodyParser.json()

app.use(cors({
    origin: "*"
}))
// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
//     console.log(req)
//   });
app.post("/api", jsonParser, (req, res) => {
    console.log(req.body)
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});