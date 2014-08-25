/*global $ */
/*global angular */
'use strict';

/* Directives */
angular.module('home.controller', ['underscore'])
	.controller("home", ['$scope', '$http', '$window', '$modal', '$filter', '_', '$timeout',
		function($scope, $http, $window, $modal, $filter, _, $timeout) {
			function init() {
				console.log('home')
				$scope.width = $window.innerWidth * 0.8;
				$scope.height = $window.innerHeight
				$scope.small = true;
				$scope.changed = false;
				$scope.currentCate = {
					topic: 0
				}
				$scope.dataLoading = true;
				$http.get('/api/enrolls').success(function(data) {
					$scope.enroll_data = _.clone(data)
					$scope.sorted_enrolls = [];
					var enrolls = data
					while (enrolls.length) {
						console.log($scope.enroll_data)
						$scope.sorted_enrolls.push(enrolls.splice(0, 2))
					}
				}).finally(function() {
					console.log('end')
					$scope.dataLoading = false;
				});
			}
			init();
			$scope.$watch('currentCate.topic', function(newVal, oldVal) {
				if ($scope.changed === true) {
					$scope.sorted_enrolls = []
					var enrolls = $filter('filter')($scope.enroll_data, $scope.currentCate)
					while (enrolls.length) {
						$scope.sorted_enrolls.push(enrolls.splice(0, 2))
					}
				} else {
					$scope.changed = true
				}
			})
			$scope.changeTag = function($index) {

				$scope.small = true;
			}
			$scope.cate = function($index) {
				console.log($scope.data)
				if (!$index) {
					delete $scope.currentCate.topic
				} else {
					$scope.currentCate.topic = $index
				}
			}
			$scope.open = function(model) {
				var modalInstance = $modal.open({
					templateUrl: 'myModalContent.html',
					controller: ModalInstanceCtrl,
					resolve: {
						items: function() {
							return model;
						}
					}
				});
			}
		}
	]);

var ModalInstanceCtrl = function($scope, $modalInstance, items, $timeout) {
	$scope.items = items;
	$timeout(function() {
		var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
		var match = $scope.items.videoUrl.match(regExp);
		if (match && match[2].length == 11) {
			// $scope.embedUrl = '<iframe width="560" height="315" src="//www.youtube.com/embed/' + match[2] + '" frameborder="0" allowfullscreen></iframe>'
			$('#youtubeCode').html('<iframe class="embed-responsive-item" width="300" height="168.75" src="//www.youtube.com/embed/' + match[2] + '" frameborder="0" allowfullscreen></iframe>');
		}
	}, 0);
	$scope.ok = function() {
		$modalInstance.close("ok");
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
};