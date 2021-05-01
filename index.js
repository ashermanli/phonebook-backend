require('dotenv').config()
const express = require("express");
const { json } = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./src/models/person");

//Middleware
const app = express();
app.use(express.static("/build"));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());





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


/* const generateId = () => {
  const maxID = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;

  return maxID + 1;
}; */

//default page
app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

//some basic info about our app
app.get("/info", (request, response) => {
  response.send(`<div>
                        <p>Phonebook has information for ${
                          persons.length
                        } people</p>
                        <p>${new Date()}</p>
                    </div>`);
});

/*************************|||||||||********************************/
//get all persons of the database
app.get("/api/persons",  (request, response) => {
  const persons =  Person.find({})
  .then((result) => {
    console.log(result)
    response.json(result)
  })
  .catch(err => console.log(err))
});

/*************************|||||||||********************************/
//get a single person of the database
app.get("/api/persons/:id",  (request, response, next) => {
  const person =  Person.findById(request.params.id)
  .then(result => {
    if(result){
      response.json(result)
    }
    else{
      response.status(404).end()
    }
  })
  .catch(err => {
    next(err)
  })
  

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

/*************************|||||||||********************************/
//delete a person from the database
app.delete("/api/persons/:id", (request, response) => {
  

Person.findByIdAndRemove(request.params.id)
.then(result => {
  console.log(result)
  console.log('succesfully delted')
  response.json(result)
})
.catch(error => console.log(error))

//cant convert to number as mongodb atlas requires a string for the id
// const id = Number(request.params.id); 
  // persons = persons.filter((p) => p.id !== id);

  //response.status(204).end();
});

/*************************|||||||||********************************/ 
//add a person to the database
app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({ error: "missing name" });
  }
  if (!body.number) {
    return response.status(400).json({ error: "missing number" });
  }

  /* if (persons.some((p) => p.name === body.name)) {
    return response.status(400).json({ error: "person already exists" });
  } */

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
    // mongoose.connection.close();
  });

  //   console.log(person);
  //persons = persons.concat(person);
  // response.json(person);
});

/*************************|||||||||********************************/ 
//update a person on the database
app.put("/api/persons/:id", (request, response) =>{
  const body =  request.body

  const update = {
    name: body.name,
    number: body.number
  }

  //{new:true} is required for the response to return our updated entry and rerender the front end
  Person.findByIdAndUpdate(request.params.id, update, {"new": "true"})
  .then(updatedPerson => {
    console.log(updatedPerson)
    response.json(updatedPerson)
  })
  .catch(err => next(error))
})

//when an a page is not found show them a 404 error
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next)=>{
  console.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({error:'malformatted id'})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
