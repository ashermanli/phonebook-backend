const personRouter = require('express').Router()
const Person = require('../models/person')


// //default page
// personRouter.get('/', (request, response) => {
//   response.send('hello')
// })

// //some basic info about our app
// personRouter.get('/info', (request, response) => {
//   const persons = Person.find({})
//   response.send(`<div> <p>Phonebook has information for ${persons.length} people</p>
// 						  <p>${new Date()}</p>
// 					  </div>`)
// })

/*************************|||||||||********************************/
//get all persons of the database
personRouter.get('/',  (request, response) => {
  const persons =  Person.find({})
	  .then((result) => {
      console.log(result)
      response.json(result)
	  })
	  .catch(err => console.log(err))
})

/*************************|||||||||********************************/
//get a single person of the database
personRouter.get('/:id',  (request, response, next) => {
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

})

/*************************|||||||||********************************/
//delete a person from the database
personRouter.delete('/:id', (request, response) => {

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
})

/*************************|||||||||********************************/
//add a person to the database
personRouter.post('/', (request, response, next) => {
  const body = request.body
  if (!body.name) {
	  return response.status(400).json({ error: 'missing name' })
  }
  if (!body.number) {
	  return response.status(400).json({ error: 'missing number' })
  }

  /* if (persons.some((p) => p.name === body.name)) {
	  return response.status(400).json({ error: "person already exists" });
	} */

  const person = new Person({
	  name: body.name,
	  number: body.number,
  })

  //save person to the database
  person.save()
	  .then((savedPerson) => {
      response.json(savedPerson)
	  // mongoose.connection.close();
	  })
	  .catch(error => {
      console.log(error)
      next(error)
	  })

  //   console.log(person);
  //persons = persons.concat(person);
  // response.json(person);
})

/*************************|||||||||********************************/
//update a person on the database
personRouter.put('/:id', (request, response, next) => {
  const body =  request.body

  const update = {
	  name: body.name,
	  number: body.number
  }

  //{new:true} is required for the response to return our updated entry and rerender the front end
  Person.findByIdAndUpdate(request.params.id, update, { 'new': 'true' })
	  .then(updatedPerson => {
      console.log(updatedPerson)
      response.json(updatedPerson)
	  })
	  .catch(error => next(error))
})

module.exports = personRouter