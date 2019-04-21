const express = require('express'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
require('dotenv').config();
// Db Config
const db = require('./config/keys_aws.js').mongoURI;
const app = express();

//Add passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//Add Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Apis
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

console.log("Env ",process.env.NODE_ENV);
//Connecting to mongoose
mongoose
    .connect(db)
    .then(() => console.log('Mongoose Connected Succesfully'))
    .catch((err) => console.log(err));


app.get('/', (req,res) => res.send('Hello '));
app.use('/api/users',users);
app.use('/api/post',posts);
app.use('/api/profile',profile);

//Server static assets if in production
// if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(_dirname,'client','build','index.html'));
    })
// }

const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})