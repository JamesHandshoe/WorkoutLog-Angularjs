(function(){
	angular.module('workoutlog')
	.service('FeedService', FeedService);

	FeedService.$inject = ['$http', 'API_BASE', 'socket'];
	function FeedService($http, API_BASE, socket) {
		var feedService = this;
		feedService.feed = [];

		feedService.fetch = function() {
			return $http.get(API_BASE + 'feed')
				.then(function(response){
					feedService.feed = response.data;
				});
		};

		feedService.get = function() {
			return feedService.feed;
		};
	}
})();