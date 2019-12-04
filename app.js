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

app.get('/api/v1/projects', (request, response) => {
	database('projects').select()
		.then(projects => response.status(200).json(projects))
		.catch(error => response.status(500).json({ error }))
});

app.get('/api/v1/projects/:id', (request, response) => {
  database('projects').where('id', request.params.id).select()
  	.then((project) => {
  		if (project.length) {
	  		response.status(200).json(project)
	  	} else {
	  		response.status(404).json({ error: 'Project Not Found'})
	  	}
  	})
  	.catch(error => response.status(500).json({ error }))
});

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  for (let requiredParameter of ['projectId', 'name']) {
    if (!project[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { projectId: <Integer>, name: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('projects').insert(project, 'id')
    .then(project => {
      response.status(201).json({ id: project[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    })
});

module.exports = app;