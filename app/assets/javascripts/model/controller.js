/*global $ */
/*global angular */
'use strict';
/* Directives */
angular.module('model.controller', [])
	.controller("model", ['$sce', '$scope', '$modalInstance', 'items', '$timeout', '$log', '$http', '$filter',
		function($sce, $scope, $modalInstance, items, $timeout, $log, $http, $filter) {
			$scope.topics = [{
				value: 0,
				index: 'choice1'
			}, {
				value: 1,
				index: 'choice2'
			}]
			$scope.years = [{
				value: 0,
				index: '大學一年級'
			}, {
				value: 1,
				index: '大學二年級'
			}, {
				value: 2,
				index: '大學三年級'
			}, {
				value: 3,
				index: '大學四年級'
			}, {
				value: 4,
				index: '大學五年級'
			}, {
				value: 5,
				index: '大學六年級'
			}, {
				value: 6,
				index: '大學七年級'
			}, {
				value: 7,
				index: '碩士一年級'
			}, {
				value: 8,
				index: '碩士二年級'
			}, {
				value: 9,
				index: '博士一年級'
			}, {
				value: 10,
				index: '博士二年級'
			}, {
				value: 11,
				index: '其他'
			}]
			$scope.items = items;
			$timeout(function() {
				var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
				var match = $scope.items.videoUrl.match(regExp);
				$http.get('/youtube/' + match[2])
					.success(function(data, status, headers, config) {
						var likes = ((data.entry.gd$rating.average - 1) * data.entry.gd$rating.numRaters / 4)
						console.log([data.entry.gd$rating, data.entry.yt$statistics])
						$scope.likes = $filter('number')(likes, 0)
					})
				if (match && match[2].length == 11) {
					$('#youtubeCode').html('<iframe class="embed-responsive-item" width="300" height="168.75" src="//www.youtube.com/embed/' + match[2] + '" frameborder="0" allowfullscreen></iframe>');
				}
			}, 0)
			$scope.ok = function() {
				$modalInstance.close("ok");
			};
			$scope.cancel = function() {
				$modalInstance.dismiss('cancel');
			};
		}
	]);
