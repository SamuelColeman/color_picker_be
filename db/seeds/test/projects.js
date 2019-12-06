const projects = require('../../../projects');
const palettes = require('../../../palettes');

const createProjects = (knex, project) => {
  return knex('projects').insert({
    projectId: project.projectId,
    name: project.name
  }, 'projectId')
  .then(projectId => {
    let palettePromises = [];

    palettes.filter(palette => palette.projectId === projectId[0]).forEach(palette => {
      palettePromises.push(createPalette(knex, {
        projectId: projectId[0],
        name: palette.name,
        color1: palette.color1,
        color2: palette.color2,
        color3: palette.color3,
        color4: palette.color4,
        color5: palette.color5,
      }))
    })
    return Promise.all(palettePromises);
  })
};

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette)
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      let projectPromises = [];

      projects.forEach(project => {
        projectPromises.push(createProjects(knex, project))
      });

      return Promise.all(projectPromises)
    })
    .catch(error => console.log(`Error seeding data!! :: ${error}`));
};