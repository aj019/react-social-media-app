const express = require('express'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
// Db Config
const db = require('./config/keys.js').mongoURI;
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

//Connecting to mongoose
mongoose
    .connect(db)
    .then(() => console.log('Mongoose Connected Succesfully'))
    .catch((err) => console.log(err));


app.get('/', (req,res) => res.send('Hello '));
app.use('/api/users',users);
app.use('/api/posts',posts);
app.use('/api/profile',profile);

const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})