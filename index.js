const express = require("express");
require("./db");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const authRoute = require("./routes/user");
const notesRoute = require("./routes/notes");

app.use(cors());
app.use(express.json());

app.use(express.static("client/build"));
app.use("/user", authRoute);
app.use("/notes", notesRoute);


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
