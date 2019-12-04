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
});