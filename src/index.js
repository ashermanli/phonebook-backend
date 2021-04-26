const express = require("express");
const { json } = require("express");
const morgan = require("morgan");
const cors = require("cors");

const personModel = require("./models/person");
const Person = personModel.pers
const connectDB = () => Person.connect


connectDB()
const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("build"));


// Dev debugging code
// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendick",
//     number: "39-23-6423122",
//   },
// ];


// const generateId = () => {
//   const maxID = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;

//   return maxID + 1;
// };

//default page
app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/info", (request, response) => {
  response.send(`<div>
                        <p>Phonebook has information for ${
                          persons.length
                        } people</p>
                        <p>${new Date()}</p>
                    </div>`);
});

//get all persons of the database
app.get("/api/persons",  (request, response) => {
  const persons =  Person.find({});
  response.json(persons)
});

//get a single person of the database
app.get("/api/persons/:id",  (request, response) => {
  const person =  Person.findById(request.params.id)
  .catch(err => response.status(404).json({noPersonFound:'No Person Found!'}))
  response.json(person)
  

  //Development and debugging
  // const id = Number(request.params.id);
  // const person = persons.find(p => request.params.id === p.id)
  // if(person){
  //   response.json(person)
  // }
  // else{
  //   response.json(404)
  // }

});


app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({ error: "missing name" });
  }
  if (!body.number) {
    return response.status(400).json({ error: "missing number" });
  }

  if (persons.some((p) => p.name === body.name)) {
    return response.status(400).json({ error: "person already exists" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
    mongoose.connection.close();
  });

  //   console.log(person);
  persons = persons.concat(person);
  // response.json(person);
});

//when an a page is not found show them a 404 error
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
