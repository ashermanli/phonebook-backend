require('dotenv').config()
const mongoose = require('mongoose')

const db = process.env.MONGODB_URI

//For heroku to work, you must specify database name in the connection params
const params = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true ,
    dbName: 'people'
}

console.log('connecting to the database')

const DBconnect = mongoose.connect(db, params).then(()=>{
    console.log('connected to database')
})
.catch(error => console.log('error connecting to db: ', error.message))

module.exports.db = DBconnect