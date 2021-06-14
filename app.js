const mongoose = require("mongoose");
const User = require("./models/User");
const express = require("express");
const app = express();
const db = require("./confg/keys").mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.log(err));

app.use(passport.initialize())
require('./confg/passport')(passport);

    app.get("/", (req, res) => {
        const user = new User({
            handle: 'kaz',
            email: 'kaz@kaz.kaz',
            password: 'kaz123'
        })
        user.save()
        res.send("Hello World!");
    });

app.use(bodyParser.urlencoded({
        extended: false
    }));
app.use(bodyParser.json());
    
app.use("/api/users", users);
app.use("/api/tweets", tweets);

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Listening on port ${port}`)});


// const mongoose = require('mongoose');
// const db = require('./confg/keys').mongoURI;

// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => console.log("Connected to MongoDB successfully"))
//   .catch(err => console.log(err));

// const user = require('./models/User');  
// const express = require("express");
// const app = express();
// const bodyParser = require('body-parser');
// const passport = require('passport');

// const users = require("./routes/api/users");
// const tweets = require("./routes/api/tweets");
  
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.get("/", (req, res) => res.send("Hello World!!"));

// app.use(passport.initialize());
// require('./confg/passport')(passport);


// app.use("/api/users", users);
// app.use("/api/tweets", tweets);

// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server is running on port ${port}`));