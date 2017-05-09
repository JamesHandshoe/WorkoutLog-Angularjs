(function(){
	angular
		.module('workoutlog.auth.signin',['ui.router'])
		.config(signinConfig);

		function signinConfig($stateProvider) {
			$stateProvider
				.state('signin', {
					url: '/signin',
					templateUrl: '/components/auth/signin.html',
					controller: SignInController,
					controllerAs: 'ctrl',
					bindToController: this
				});
		}

		signinConfig.$inject = ['$stateProvider'];

		function SignInController($state, UsersService) {
			var vm = this;
			vm.user = {};
			vm.login = function() {
				UsersService.login(vm.user).then(function(response){
					$state.go('define');
				});
			};
		}

		SignInController.$inject = ['$state', "UsersService"];
})();