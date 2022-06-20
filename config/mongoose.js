const mongoose=require('mongoose') //require the library

mongoose.connect('mongodb://localhost/codial_db') //connect to the database

const db=mongoose.connection //acquire connection

db.once('open',function(){
    console.log('sucessfull database')
});