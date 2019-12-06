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

app.patch('/api/v1/projects/:projectId', (request, response) => {
  const { projectId } = request.params;
  const { name } = request.body;
  database('projects')
    .where({ projectId: projectId })
    .update({ name: name })
    .then(project => {
      if (!project) {
        response.status(404).json({ error: `No project found with projectId ${projectId}`})
      } else {
        response.status(202).json({ message: 'Project renamed!'})
      }
    });
});

app.patch('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;
  const { color1 } = request.body;
  database('palettes')
    .where({ id: id })
    .update({ color1: color1 })
    .then(palette => {
      if (!palette) {
        response.status(404).json({ error: `No palette found with id ${id}`})
      } else {
        response.status(202).json({ message: 'Palette color reassigned!'})
      }
    });
});

app.delete('/api/v1/projects/:projectId', (request, response) => {
	database('projects').where('projectId', request.params.projectId).select().del()
   	.then(project => {
    	if (project) {
        response.status(202).json(`Project ${request.params.projectId} deleted`);
      } else {
        response.status(404).json({ 
          error: `Could not find project with id: ${request.params.projectId}`
        })
      }
    })
    .catch(error => {
    	response.status(500).json({ error });
    })
});

app.get('/api/v1/palettes', (request, response) => {
	database('palettes').select()
		.then(palettes => response.status(200).json(palettes))
		.catch(error => response.status(500).json({ error }))
});

app.get('/api/v1/palettes/:id', (request, response) => {
  database('palettes').where('id', request.params.id).select()
  	.then((palette) => {
  		if (palette.length) {
	  		response.status(200).json(palette)
	  	} else {
	  		response.status(404).json({ error: 'Palette Not Found'})
	  	}
  	})
  	.catch(error => response.status(500).json({ error }))
});

app.post('/api/v1/palettes', (request, response) => {
  const palette = request.body;

  for (let requiredParameter of ['projectId', 'name', 'color1', 'color2', 'color3', 'color4', 'color5']) {
    if (!palette[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { projectId: <Integer>, name: <String>, colors: <Strings> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('palettes').insert(palette, 'id')
    .then(palette => {
      response.status(201).json({ id: palette[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    })
});

app.delete('/api/v1/palettes/:id', (request, response) => {
	database('palettes').where('id', request.params.id).select().del()
   	.then(palette => {
    	if (palette) {
        response.status(202).json(`Palette ${request.params.id} deleted`);
      } else {
        response.status(404).json({ 
          error: `Could not find palette with id: ${request.params.id}`
        })
      }
    })
    .catch(error => {
    	response.status(500).json({ error });
    })
});

module.exports = app;