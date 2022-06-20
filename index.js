const cookieParser = require('cookie-parser');
const express=require('express');
const app=express();
const port=8000;
const db=require('./config/mongoose')
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const MongoStore = require("connect-mongo");
const expressLayouts = require('express-ejs-layouts');
const flash=require('connect-flash');
const passportgoogle=require('./config/passport-google-oauth2-strategy')

//set up the chat server to be used with socket.io
const chatServer= require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');


app.use(cookieParser())
app.use(express.urlencoded());

//make the uploads path avaialable to the browser


//set up the view engine
app.use(expressLayouts);
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('assets'));
app.use('/layout',express.static(__dirname+'/layout'));
console.log(__dirname+'/layout');
// app.use('/uploads',express.static(__dirname + '/uploads'))
// console.log(__dirname+'/uploads');


//mongo store is used to store the session cookie in the db
app.use(session({
    name:'codial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized :false,
    resave :false,
    cookie: {
        maxAge :(1000*60*100),
    },
    store: MongoStore.create(
        { 
        mongoUrl: 'mongodb://localhost/codial_db',
        autoRemove: 'disabled'
        },
    function(err){
        console.log(err || 'connect mongo-db setup ok');
    }
    )
 }));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());

//use express router

app.use('/',require('./routes/index'))

app.listen(port,function(err,){
    if(err)
    {
        console.log("error",err);
        console.log(`error in running the server :${port}`);
    }
    console.log(`server is running on port : ${port}`); 
})
