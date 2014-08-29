/*global $ */
/*global angular */
'use strict';
/* Directives */
angular.module('home.controller', ['underscore'])
	.controller("home", ['$sce', '$scope', '$http', '$window', '$modal', '$filter', '_', '$timeout', '$document', '$log',
		function($sce, $scope, $http, $window, $modal, $filter, _, $timeout, $document, $log) {
			function init() {
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
				console.log('home')
				$scope.changed = false;
				$scope.currentCate = {
					topic: 0
				}
				$scope.dataLoading = true;
				$http.get('/api/enrolls').success(function(data) {
					$scope.enrolls = []
					angular.forEach(data, function(value, index) {
						if (value.topic && value.videoUrl && value.videoInfo) {
							$scope.enrolls.push(value)
						}
					})
				}).finally(function() {});
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
				$http.post('/view_increase', {
					id: model.id
				}).success(function(data) {
					model.view = data.view
					console.log(data)
				})
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
var ModalInstanceCtrl = function($sce, $scope, $modalInstance, items, $timeout) {
	$scope.items = items;
	$scope.html = items.videoInfo;
	$scope.trustedHtml = $sce.trustAsHtml($scope.html);
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