const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/booklist", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/api/booklist/:id", (req, res) => {
  res.send(req.params.id);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listning on port ${port}...`));
