// importing express module
var express = require('express');
var router = express.Router();
var fs = require('fs');

var preCreData = fs.readFileSync('./prehistoric_creatures.json');
preCreData = JSON.parse(preCreData);


// var app = express();

// // router.get('/creatures', function(req, res) {
// //   // res.render('faves/foods', {title: 'Favorite Foods', foods: ['chocolate', 'coffee', 'bok choy']})
// // });

///////



router.get('/prehistoric_creatures/index', function(req, res) {
	var nameFilter = req.query.nameFilter;
	if(nameFilter) {
		var filteredData = preCreData.filter(function(creature) {
			return creature.name.toLowerCase()===nameFilter.toLowerCase();		
		});
		res.render('index', {myCreatures: filteredData});
	} else {
		res.render('index', {myCreatues: preCreData});
	};
});


// prehistoric creatures new form route
router.get('/prehistoric_creatures/new', function (req, res) {
	res.render('new');
});



///////
// new creature post route
app.post('/prehistoric_creatures', function(req, res) {
	// add new creature to our array
	preCreData.push(req.body);
	// save new creature to json file
	fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(preCreData));
	//redirect to the GET/dinosaurs route (index)
	res.redirect('/prehistoric_creatures');
});	




///////
// creature show route (needs to be last or it will capture URL patterns as get requests)
app.get('/prehistoric_creatures/:idx', function(req, res) {
	if(preCreData[req.params.idx-1]) {
		res.render('show', {creature: preCreData[req.params.idx-1]});
	} else {
		res.send("This creature is not in our data set.");
	}
});

module.exports = router;
