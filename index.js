const Joi = require("joi");
const express = require("express");
const { validate } = require("joi/lib/types/object");
const app = express();

app.use(express.json());

const booklist = [
  { id: 1, name: "Book1", author: "Author1", finished: true },
  { id: 2, name: "Book2", author: "Author2", finished: false },
  { id: 3, name: "Book3", author: "Author3", finished: false },
];

app.get("/", (req, res) => {
  res.send("Hello Ashan");
});

app.get("/api/booklist", (req, res) => {
  res.send(booklist);
});

app.get("/api/booklist/:id", (req, res) => {
  const book = booklist.find((b) => b.id === parseInt(req.params.id));
  if (!book)
    return res.status(404).send("The book with the given ID was not found!");
  res.send(book);
});

app.post("/api/booklist", (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message); //400 Bad Request

  const book = {
    id: Date.now(),
    name: req.body.name,
    author: req.body.author,
    finished: req.body.finished,
  };
  booklist.push(book);
  res.send(booklist);
});

app.put("/api/booklist/:id", (req, res) => {
  const book = booklist.find((b) => b.id === parseInt(req.params.id));
  if (!book)
    return res.status(404).send("The book with the given ID was not found!");

  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message); //400 Bad Request

  book.name = req.body.name;
  book.author = req.body.author;
  book.finished = req.body.finished;
  res.send(book);
});

app.delete("/api/booklist/:id", (req, res) => {
  const book = booklist.find((b) => b.id === parseInt(req.params.id));
  if (!book)
    return res.status(404).send("The book with the given ID was not found!");

  const index = booklist.indexOf(book);
  booklist.splice(index, 1);

  res.send(book);
});

function validateBook(book) {
  const schema = {
    name: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    finished: Joi.boolean().required(),
  };

  return Joi.validate(book, schema);
}

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
