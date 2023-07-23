const express = require("express");
const app = express();

app.get("/super-secure-resource", (req, res) => {
  return res
    .status(401)
    .json({ message: "You need to be logged in to access this resource" });
});

app.listen(3001, () => {
  console.log("API running on localhost: 3001");
});
