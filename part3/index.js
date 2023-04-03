const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

let phoneBook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Peppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World! </h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(phoneBook);
});

app.get("/info", (request, response) => {
  const length = phoneBook.length;
  const requestDate = new Date().toLocaleString();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  response.send(
    `<div><p>Phonebook has info for ${length} people</p></div>
    <div><p>${requestDate} ${timeZone} </p></div>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = phoneBook.find((person) => person.id === id);
  person ? response.json(person) : response.status(404).end();
});

app.post("/api/persons", (request, response) => {
  const newPerson = request.body;
  const randomID = Math.floor(Math.random() * 1000);
  newPerson.id = randomID;
  const nameInBook = phoneBook.find((person) => person.name === newPerson.name);

  if (nameInBook) {
    console.log(nameInBook);
    return response.status(400).json({
      error: "name is not unique",
    });
  } else if (!newPerson.name) {
    return response.status(400).json({
      error: "missing name",
    });
  } else if (!newPerson.number) {
    return response.status(400).json({
      error: "missing number",
    });
  }

  phoneBook = phoneBook.concat(newPerson);
  response.json(newPerson);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  phoneBook = phoneBook.filter((person) => person.id !== id);
  console.log(phoneBook);
  response.status(204).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
