const express = require('express');
const cors = require('cors');
const app = express();

app.locals.title = 'Palette Picker BE';
app.use(cors());
app.use(express.json());
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.get('/', (request, response) => {
	response.send('Palette Picker BE is running!')
});

module.exports = app;