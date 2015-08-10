var mongoose = require('mongoose');

module.exports = mongoose.model('Bookings',
								new mongoose.Schema({busId : String, name : String, mobile : String, seats : String}),
								'bookings');
