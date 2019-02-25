const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const helpers = require('./helpers');

const app = express();

function registerHelpers(obj) {
	Object.keys(obj).forEach(key => hbs.registerHelper(key, obj[key]));
}

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
registerHelpers(helpers);

app.use((req, res, next) => {
	const now = new Date().toString();
	const log = `${now}: ${req.method} ${req.url}`;

	fs.appendFile('server.log', log + '\n', err => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	console.log(log);
	next();
})

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Hello There',
	});
});

app.get('/about', (req,res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		error: 'Unable to fulfill request'
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});
