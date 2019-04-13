//start include
const express = require("express");
const mongoose = require("mongoose");
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

//end
const app = express();

app.use(express.json());

//changing router
app.use('/api/users', require('./routes/api/users'));
app.use("api/profiles", require("./routes/api/profiles"));
app.use("api/post", require("./routes/api/post"));
//setting port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app is running on port : ${port}`);
});
