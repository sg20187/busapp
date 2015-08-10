var Availability = require('./models/availability');
var Bookings = require('./models/bookings');

function searchTickets(req, res){

console.log(req.body.source.name+' '+req.body.destination.name+' '+req.body.date);
var date = new Date(req.body.date);
var day = date.getDate().toString();
var month = (date.getMonth()+1).toString();
var year = date.getFullYear().toString();
var dateFmt = (day[1]?day:'0'+day[0])+'/'+(month[1]?month:'0'+month[0])+'/'+(year)
var dest = req.body.destination.name;
var src = req.body.source.name;
//console.log(dateFmt);

	var searchCallback = function(err, searchResults) {
	//	console.log("find...");
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err){
				res.send(err);
				console.log(err);
				}	
			res.json(searchResults); // return all todos in JSON format
		//	console.log(searchResults);
		}

	Availability.find().
		where('destination').equals(dest).
		where('source').equals(src).
		where('date').equals(dateFmt).
		exec(searchCallback);
	
}

function bookTickets(req, res){
	console.log(req.body.name);
	Availability.findOne({id:req.body.busId}, function(err, bus){
		console.log(bus);
		bus.seats = bus.seats - req.body.noOfSeats;
		bus.save(function(err){
			if(err){
				console.error('ERROR !!');
			}
		});
	});

	var bookingDetails = {};
	bookingDetails.busId = req.body.busId;
	bookingDetails.name = req.body.name;
	bookingDetails.mobile = req.body.mobile;
	bookingDetails.seats = req.body.noOfSeats;

	var book = new Bookings(bookingDetails);
	book.save(function(err){
			if(err){
				console.error('ERROR !!');
			}
	});
}


function getBookings(req, res){
	console.log(req.params.busId);
	Bookings.find({busId:req.params.busId}, function(err, bookings){
	if (err){
					res.send(err);
					console.log(err);
					}	
				res.json(bookings); //
		});
}

module.exports = function(app){
	
	app.post('/api/searchTickets', function(req, res) {
	//	console.log("route  searchTickets"+ req.body.source);
		searchTickets(req, res);
	});	

	app.post('/api/bookTickets', function(req, res){
		bookTickets(req, res)
	});

	app.get('/api/getBookings/:busId', function(req, res){
		getBookings(req, res);
	});

	app.get('/api/test', function(req, res){
		console.log('in api test');
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

}
