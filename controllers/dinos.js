var express = require('express');
//var app = express();

var router = express.Router();


// >>>>> ROUTES >>>>>>>>>>>

// router.get('/dinos', function(req, res) {
//   // not sure what goes here
//   //res.render('faves/animals', {title: 'Favorite Animals', animals: ['sand crab', 'corny joke dog']})
// });


// dino index route

// NOTE: when you move app.get rom index.js to controller file
// NOTE: change get.app to router.get
// NOTE: change the path from '/dinos' to '/'
// NOTE: also need to bring dinoData into this file
router.get('/', function(req, res) {  
	var nameFilter = req.query.nameFilter;
	if(nameFilter) {
		var filteredData = dinoData.filter(function(dino) {
			return dino.name.toLowerCase()===nameFilter.toLowerCase();		
		});
		res.render('index', {myDinos: filteredData});
	} else {
		res.render('index', {myDinos: dinoData});
	};
});

// dino new form route
router.get('/new', function (req, res) {
	res.render('new');
});

// dino show route (needs to be last or it will capture URL patterns as get requests)
router.get('/:idx', function(req, res) {
	if(dinoData[req.params.idx-1]) {
		res.render('show', {dino: dinoData[req.params.idx-1]});
	} else {
		res.send("This dinosaur is not in our data set.");
	}
});


// new dinosaur post route
router.post('/', function(req, res) {
	// add new dino to our array
	dinoData.push(req.body);
	// save new dino to json file
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
	//redirect to the GET/dinosaurs route (index)
	res.redirect('/dinosaurs');
});	


// tell node to export router (router is a method that comes with express) object
module.exports = router;
