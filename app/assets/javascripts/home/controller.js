/*global $ */
/*global angular */
'use strict';
/* Directives */
angular.module('home.controller', ['underscore', 'duScroll'])
	.controller("home", ['$sce', '$scope', '$http', '$window', '$modal', '$filter', '_', '$timeout', '$document', '$log', '$location',
		function($sce, $scope, $http, $window, $modal, $filter, _, $timeout, $document, $log, $location) {
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
				$scope.currentCate = {}
				$scope.dataLoading = true;
				$http.get('/api/enrolls').success(function(data) {
					$scope.enrolls = []
					angular.forEach(data, function(value, index) {
						if (value.videoUrl !== null && value.videoInfo !== null) {
							$scope.enrolls.push(value)
						} else {
							console.log(value)
						}
					})
				})
				$http.get('/get_article.json').success(function(data) {
					$scope.articles = []
					if (data[0]) {
						$scope.context = data[0].context
						$scope.image = data[0].image
						$scope.created_at = data[0].created_at
					}
					angular.forEach(data, function(value, index) {
						$scope.articles.push(value)
					})
				})
				$scope.predicate = "-view";
			}
			init();

			$scope.changeBulletin = function(article) {
				$scope.context = article.context
				$scope.image = article.image
				$scope.created_at = article.created_at
			}
			$scope.goToWhy = function() {
				var someElement = angular.element(document.getElementById('why'));
				$document.scrollToElement(someElement, 80, 2000);
			}
			$scope.goToBulletin = function() {
				console.log($location.absUrl() === 'http://www.ntuepc.com/' || $location.absUrl() === 'http://localhost:3000/')
				if ($location.absUrl() === 'http://www.ntuepc.com/' || $location.absUrl() === 'http://localhost:3000/' || $location.absUrl() === 'http://ntuvrepc.herokuapp.com/') {
					var someElement = angular.element(document.getElementById('bulletin'));
					$document.scrollToElement(someElement, 80, 2000);
				} else {
					$window.location.href = '/bulletin'
				}
			}
			$scope.goToTop = function() {
				var someElement = angular.element(document.getElementById('top'));
				$document.scrollToElement(someElement, 80, 2000);
			}
			if ($location.absUrl() === '') {
				$scope.indi = false
			} else if ($location.absUrl() === '/enrolls') {
				$scope.indi = false
			} else {
				$scope.indi = true
			}
			$scope.cate = function($index) {
				console.log($index)
				if (!$index) {
					delete $scope.currentCate.topic
				} else {
					$scope.currentCate.topic = "'" + $index
				}
				console.log($filter('filter')($scope.enrolls, $scope.currentCate, true))
			}
			var bodyRef = angular.element($document[0].body);
			$scope.open = function(model) {
				model.url = $location.absUrl() + model.id
				bodyRef.addClass('ovh');
				$http.post('/view_increase', {
					id: model.id
				}).success(function(data) {
					model.view = data.view
					console.log(data)
				})
				ga('send', 'modal opened');
				var modalInstance = $modal.open({
					templateUrl: 'myModalContent.html',
					controller: 'model',
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
				});
			}
		}
	]);
