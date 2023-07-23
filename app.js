const express = require("express");
const app = express();
const PORT = 8000;
const router = require('./routes/index.js')

app.use(express.json())
app.use(router);

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
