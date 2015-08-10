angular.module('bookingService', [])

	.factory('Bookings', ['$http',function($http) {
		return {
			searchTickets : function(search) {
		//		console.log('bookingService get method');
		//		console.log('bookingService '+search.source);
				return $http.post('/api/searchTickets', search);
				//return $http.get('/api/test');
			},

			bookTickets : function(bookingDetails) {
				console.log(bookingDetails);
				return $http.post('/api/bookTickets', bookingDetails);
			},

			getBookings : function(busId) {
				console.log(busId);
				return $http.get('/api/getBookings/'+busId);
			},
		}
	}]);
