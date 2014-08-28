var app = angular.module('myApp', ['underscore', 'ui.bootstrap', 'enroll', 'home'])
	.config(["$httpProvider",
		function(provider) {
			provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
		}
	]);