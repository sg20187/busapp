angular.module('bookingController', [])

	.controller('mainController', ['$scope','$http','Bookings', function($scope, $http, Bookings) {

		$scope.search = {source:'pune', destination:'mumbai', date:''};
		$scope.showSearchResults = false;
		$scope.searchResults = {};
		$scope.sourceList = [
							{'name':'Pune'},
							{'name':'Mumbai'},
							{'name':'Kolhapur'}
						];
		$scope.destinationList = [
							{'name':'Pune'},
							{'name':'Mumbai'},
							{'name':'Kolhapur'}
						];						
		$scope.showBusDetails = false;
		$scope.showConfirmation = false;	

		$scope.searchTickets = function(){
		//	console.log('mainController '+$scope.search.source.name);
				$scope.showBusDetails = false;
				$scope.showConfirmation = false;	
				$scope.selectedBus.showBookings = false;
			$scope.bookingDetils.name = '';
			$scope.bookingDetils.mobile = '';
			$scope.bookingDetils.noOfSeats = 1;
			
			Bookings.searchTickets($scope.search)
				.success(function(data) {
					//console.log(data);
					$scope.searchResults = data;
					$scope.showSearchResults = true;
				//	console.log($scope.searchResults);
				});
		};

		$scope.selectedBus = {};
		$scope.bookingDetils = {};
		$scope.bookingDetils.noOfSeats = 1;

		$scope.selectBus = function(){
			console.log(this.r);
			$scope.selectedBus = this.r;
			$scope.bookingDetils.busId = $scope.selectedBus.id;
			$scope.showBusDetails = true;
		}

		$scope.bookTickets = function(){
	//		console.log($scope.bookingDetils.noOfSeats);
			Bookings.bookTickets($scope.bookingDetils)
				.success(function(data){
					console.log(data);
				});
			$scope.showBusDetails= false;
			$scope.showSearchResults = false;
			$scope.showConfirmation = true;	
		}

		$scope.selectedBus.bookings = {};
		$scope.selectedBus.showBookings = false;
		$scope.getBusBookings = function(){
			console.log($scope.selectedBus.id);

			Bookings.getBookings($scope.selectedBus.id)
				.success(function(data){
					console.log(data);
					$scope.selectedBus.bookings = data;
					$scope.selectedBus.showBookings = true;
				});
		}

/*		Bookings.get()
			.success(function(data) {
				console.log('bookingController get');
				//set UI values
			});*/

	}]);
