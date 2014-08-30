var app = angular.module('myApp', ['ui.tinymce', 'underscore', 'ui.bootstrap', 'enroll', 'home', 'myApp.controller'])
	.config(["$httpProvider",
		function(provider) {
			provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
		}
	]);