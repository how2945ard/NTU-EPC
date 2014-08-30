/*global $ */
/*global angular */
'use strict';

/* Directives */
angular.module('myApp.controller', [])
	.controller("myApp", ['$scope', '$http', '$window', '$rootScope',
		function($scope, $http, $window, $rootScope) {
			$http.get('/get_current_user').success(function(data, status, headers, config) {
				console.log(data)
				$rootScope.current_user = data
			})
		}
	]);