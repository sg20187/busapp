var mongoose = require('mongoose');

module.exports = mongoose.model('Seats',
								new mongoose.Schema({travels : String, source : String, destination : String, date : String, fare : String, seats : String}),
								'seats');
