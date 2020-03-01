const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const https = require('https')
const app = express();

//parse requests of the content type
app.use(bodyParser.json());

app.use(function(req, res, next) {
    var allowedOrigins = ['http://localhost:4200', 'https://hawksbaseballpitchplus.csse-projects.monmouth.edu'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

//parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//simple route
app.get('/', (req, res) => {
    res.json({message: "Welcome to the Application"});
});

// https.createServer({
//     key: fs.readFileSync('csse.monmouth.edu.key'),
//     cert: fs.readFileSync('c924370ddad012a6.crt')
// }, app)

app.listen(3000, ()=> {
    console.log("Server is running on port 3000.");
});

require("./app/routes/pitchers.routes.js")(app);

