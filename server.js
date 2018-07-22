const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	let now = new Date();
	let log = `request at ${now}, Method: ${req.method},IP: ${req.ip}, URL: ${req.originalUrl}`;
	fs.appendFile("server.txt", log + '\n', (error) => {
		if (error)
			console.log('Unable to append log to file')
	});
	console.log(log);
	next();
});

/* Set maintenance mode
app.use((req, res, next) => {
	res.render('maintenance', {});
});
*/
//add middleware
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => { return new Date() + 'hehe';});

hbs.registerHelper('screamIt', (text) => { return text.toUpperCase();});



/*app.get('/', (request, response)=>{
	//console.log(request);
	//response.send('<h1>Hello Express<h1>');
	response.send({
		name: 'Stefan',
		likes: ['Biking', 'Cycling']
	});
	
});*/

app.get('/', (request, response) =>{
	response.render('home', {
		pageTitle: 'Home',
		currentYear: new Date(),
		pageMessage: 'More than meets the eye'
	});
});


app.get('/about', (request, response) => {
	//response.send('<h2>About page </h2>');
	response.render('about.hbs', {
		pageTitle : 'About Page',
		currentYear: new Date()
	});
});

app.get('/bad', (request, response) => {
	response.status(400)
			.send({error: 'Unable to fulfill request'});
});


app.listen(port, () => {
	console.log(`Express running on ${port}`);
});
