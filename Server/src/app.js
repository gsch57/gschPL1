
const express = require('express')
//const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// app.use(express.static(path.join(__dirname, '../dist'))); 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cors({
    origin:true,
    methods:['GET','POST', 'DELETE', 'PUT', 'OPTION'],
	credentials: true // enable set cookie
}));

// routes ======================================================================
require('./routes.js')(app);

app.listen(process.env.PORT || 8081)

