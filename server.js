//start include
const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const path = require('path');
//end

//database config & connect
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log(" database is connected"))
  .catch(error => console.log(`error when connecting. error : ${error}`));
  mongoose.set('useFindAndModify', false);

//end
const app = express();
//middleware
app.use(express.json());

app.use(passport.initialize());
require('./config/passport')(passport);

//changing router
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/post', require('./routes/api/post'));

//checking id production
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  app.get('*' , (req,res) => {
    res.sendFile(path.resolve(__dirname , 'client' , 'build' , 'index.html'));
  })
}

//setting port
const port = process.env.PORT || 5000; 

app.listen(port, () => {
  console.log(`app is running on port : ${port}`);
});
