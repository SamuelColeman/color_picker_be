const request = require('supertest');
const app = require('./app');
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

describe('Server', () => {
	beforeEach(async () => {
		await database.seed.run();
	});

	describe('init', () => {
    it('should return a 200 status', async () => {
      const res = await request(app).get('/')
      expect(res.status).toBe(200)
    });
  });

  describe('GET /api/v1/projects', () => {
  	it('should return a 200 and all the projects', async () => {
  		const expectedProjects = await database('projects').select();

  		const response = await request(app).get('/api/v1/projects');
  		const projects = response.body;

  		expect(response.status).toBe(200);
  		expect(projects.name).toEqual(expectedProjects.name);
  	});
  });

 	describe('GET /api/v1/projects/:id', () => {
	 	it('should return a 200 and a specified project', async () => {
	 		const expectedProject = await database('projects').first();
	 		const { id } = expectedProject

	 		const response = await request(app).get(`/api/v1/projects/${id}`);
	 		const project = response.body[0];

	 		expect(response.status).toBe(200);
	 		expect(project.name).toEqual(expectedProject.name);
	 	});

	 	it('should return a 404 and the message "Project Not Found"', async () => {
	 		const invalidId = -1;

	 		const response = await request(app).get(`/api/v1/projects/${invalidId}`);

	 		expect(response.status).toBe(404);
	 		expect(response.body.error).toEqual('Project Not Found');
	 	});
	});

	describe('POST /api/v1/projects', () => {
		it('should return a 201 and add a new project to the db', async () => {
			const newProject = { projectId: 50, name: 'Sam Coleman' };

	 		const response = await request(app).post('/api/v1/projects').send(newProject);
	 		const projects = await database('projects').where('id', response.body.id).select();
	 		const project = projects[0];

	 		expect(response.status).toBe(201);
	 		expect(project.name).toEqual(newProject.name);
		});
	});

	describe('DELETE /api/v1/projects/:projectId', () => {
		it('should return a 202 and delete project from the db', async () => {
			const expectedProject = await database('projects').first();
	 		const { projectId } = expectedProject;

	 		const response = await request(app).delete(`/api/v1/projects/${projectId}`);
	 		const project = response.body;
	 		expect(response.status).toBe(202);
	 		expect(project).toEqual(`Project ${projectId} deleted`);
		});
		it('should return a 404 and the message "Could not find project with id: "', async () => {
	 		const invalidId = -1;

	 		const response = await request(app).delete(`/api/v1/projects/${invalidId}`);

	 		expect(response.status).toBe(404);
	 		expect(response.body.error).toEqual(`Could not find project with id: ${invalidId}`);
	 	});
	});

	describe('GET /api/v1/palettes', () => {
  	it('should return a 200 and all the palettes', async () => {
  		const expectedPalettes = await database('palettes').select();

  		const response = await request(app).get('/api/v1/palettes');
  		const palettes = response.body;

  		expect(response.status).toBe(200);
  		expect(palettes.name).toEqual(expectedPalettes.name);
  	});
  });

  describe('GET /api/v1/palettes/:id', () => {
	 	it('should return a 200 and a specified palette', async () => {
	 		const expectedPalette = await database('palettes').first();
	 		const { id } = expectedPalette

	 		const response = await request(app).get(`/api/v1/palettes/${id}`);
	 		const palette = response.body[0];

	 		expect(response.status).toBe(200);
	 		expect(palette.name).toEqual(expectedPalette.name);
	 	});

	 	it('should return a 404 and the message "Palette Not Found"', async () => {
	 		const invalidId = -1;

	 		const response = await request(app).get(`/api/v1/palettes/${invalidId}`);

	 		expect(response.status).toBe(404);
	 		expect(response.body.error).toEqual('Palette Not Found');
	 	});
	});

	describe('POST /api/v1/palettes', () => {
		it('should return a 201 and add a new palette to the db', async () => {
			const newPalette = { projectId: 2, name: 'Sam Coleman', color1: '#FFFFFF', color2: '#FFFFFF', color3: '#FFFFFF', color4: '#FFFFFF', color5: '#FFFFFF' };

	 		const response = await request(app).post('/api/v1/palettes').send(newPalette);
	 		const palettes = await database('palettes').where('id', response.body.id).select();
	 		const palette = palettes[0];

	 		expect(response.status).toBe(201);
	 		expect(palette.name).toEqual(newPalette.name);
		});
	});

	describe('DELETE /api/v1/palettes/:id', () => {
		it('should return a 202 and delete palette from the db', async () => {
			const expectedPalette = await database('palettes').first();
	 		const { id } = expectedPalette;

	 		const response = await request(app).delete(`/api/v1/palettes/${id}`);
	 		const palette = response.body;
	 		expect(response.status).toBe(202);
	 		expect(palette).toEqual(`Palette ${id} deleted`);
		});
		it('should return a 404 and the message "Could not find palette with id: "', async () => {
	 		const invalidId = -1;

	 		const response = await request(app).delete(`/api/v1/palettes/${invalidId}`);

	 		expect(response.status).toBe(404);
	 		expect(response.body.error).toEqual(`Could not find palette with id: ${invalidId}`);
	 	});
	});
});