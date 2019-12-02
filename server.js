const environment = process.env.NODE_ENV || 'development';
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Palette Picker BE';

app.get('/', (request, response) => {
	response.send('Palette Picker BE is running!')
});

app.listen(app.get('port'), () => {
	console.log(`App is running over on http://localhost:${app.get('port')}`);
});