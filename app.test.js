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
});