/*global $ */
/*global angular */
'use strict';
/* Directives */
angular.module('home.controller', ['underscore'])
	.controller("home", ['$scope', '$http', '$window', '$modal', '$filter', '_', '$timeout', '$document', '$log',

		function($scope, $http, $window, $modal, $filter, _, $timeout, $document, $log) {
			function init() {
				console.log('home')
				$scope.changed = false;
				$scope.currentCate = {
					topic: 0
				}
				$scope.dataLoading = true;
				$http.get('/api/enrolls').success(function(data) {
					$scope.enrolls = data
				}).finally(function() {
					console.log('end')
				});
				$scope.predicate = "-created_at";
			}
			init();
			$scope.cate = function($index) {
				console.log($scope.data)
				if (!$index) {
					delete $scope.currentCate.topic
				} else {
					$scope.currentCate.topic = $index
				}
			}
			var bodyRef = angular.element($document[0].body);
			$scope.open = function(model) {
				bodyRef.addClass('ovh');
				var modalInstance = $modal.open({
					templateUrl: 'myModalContent.html',
					controller: ModalInstanceCtrl,
					resolve: {
						items: function() {
							return model;
						}
					}
				});
				modalInstance.result.then(function(selectedItem) {
					// Remove it on closing
					bodyRef.removeClass('ovh');
					$scope.selected = selectedItem;
				}, function() {
					// Remove it on dismissal
					bodyRef.removeClass('ovh');
					$log.info('Modal dismissed at: ' + new Date());
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
			$('#youtubeCode').html('<iframe class="embed-responsive-item" width="300" height="168.75" src="//www.youtube.com/embed/' + match[2] + '" frameborder="0" allowfullscreen></iframe>');
		}
	}, 0)
	$scope.ok = function() {
		$modalInstance.close("ok");
	};
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
};