const express = require("express");
require("./db");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const authRoute = require("./routes/user");
const notesRoute = require("./routes/notes");

app.use(cors());
app.use(express.json());

app.use("/user", authRoute);
app.use("/notes", notesRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
