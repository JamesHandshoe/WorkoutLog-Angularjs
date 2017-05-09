(function() {
	angular.module('workoutlog.feed', [ 'ui.router' ])
	.config(feedConfig);

	feedConfig.$inject = [ '$stateProvider' ];

	function feedConfig($stateProvider) {
		$stateProvider
			.state('feed', {
				url: '/feed',
				templateUrl: '/components/feed/feed.html',
				controller: FeedController,
				controllerAs: 'ctrl',
				bindToController: this,
				resolve: {
					getFeed: [
						'FeedService',
						function(FeedService) {
							return FeedService.fetch();
						}
					]
				}
			});
	}

	FeedController.$inject = [ 'socket', 'FeedService', 'CurrentUser' ];
	function FeedController(socket, FeedService, CurrentUser) {
		var vm = this;
		vm.msg = {};
		vm.feed = FeedService.get();

		vm.create = function() {
			vm.msg.username = CurrentUser.get().username;
			socket.emit('chat-message', vm.msg);
		};

		socket.on('new log', function(data) {
			vm.feed.push(data);
		});

		socket.on('chat-message', function(data) {
			vm.feed.push(data);
		});
	}
})();