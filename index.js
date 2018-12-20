var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
// var fs = require('fs');
// var dinoData = fs.readFileSync('./dinosaurs.json');
// dinoData = JSON.parse(dinoData);

///////

app.set('view engine', 'ejs');
app.use(ejsLayouts);

// body parser middleware ... this deliniates what data we will parse from form
app.use(express.urlencoded({extended: false}));

// >>>>>>> CONTROLLERS <<<<<<<<<<<

app.use('/dinos', require('./controllers/dinos.js'));
app.use('/creatures', require('./controllers/creaures.js'));


// home route
app.get('/', (req, res) => {
	res.send('This is the home route');
	//console.log(dinoData);
});

// dino index route
// app.get('/dinosaurs', function(req, res) {
// 	var nameFilter = req.query.nameFilter;
// 	if(nameFilter) {
// 		var filteredData = dinoData.filter(function(dino) {
// 			return dino.name.toLowerCase()===nameFilter.toLowerCase();		
// 		});
// 		res.render('index', {myDinos: filteredData});
// 	} else {
// 		res.render('index', {myDinos: dinoData});
// 	};
// });

///////
// prehistoric creatures index route



app.listen(8000);