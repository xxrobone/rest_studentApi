const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

const routes = require('./server/routes/studentRoutes');
app.use('/', routes);

app.listen(port, () => console.log('listening to port 5000'));
