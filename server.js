const express = require('express');
const bodyParser = require('body-parser');

const app = express();


//parse requests of the content type
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//simple route
app.get('/', (req, res) => {
    res.json({message: "Welcome to the Application"});
});


require("./app/routes/pitchers.routes.js")(app);
//set port, listen for requests
app.listen(3000, ()=> {
    console.log("Server is running on port 3000.");
});

