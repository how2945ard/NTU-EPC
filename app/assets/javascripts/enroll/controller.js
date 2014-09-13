/*global $ */
/*global angular */
'use strict';

/* Directives */
angular.module('enroll.controller', [])
	.controller("enroll", ['$scope', '$http', '$window', '$rootScope', '$document', '$modal',

		function($scope, $http, $window, $rootScope, $document, $modal) {
			function init() {
				console.log('enroll')
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
				$scope.page = 1;
				$scope.enroll = {}
				$scope.login = false
				ga('send', 'enroll page view');
				filepicker.setKey("APvIX7xbrQeyWbbxZ1bMbz");
				$http.get('/get_current_user').success(function(data, status, headers, config) {
					if (!data.msg) {
						$scope.login = true
						$rootScope.current_user = data
						$scope.enroll.name = $rootScope.current_user.name
						$scope.enroll.email = $rootScope.current_user.email
						$http.get('/api/enrolls/' + $rootScope.current_user.enroll.id).success(
							function(data, status) {
								if (status !== 200) {
									$scope.enrolled = false
									ga('send', 'enroll page view (login and not enrolled)');
								} else {
									$scope.enrolled = true
									$scope.enroll = data
									$scope.enroll_id = data.id
									ga('send', 'enroll page view (login and enrolled)');
									if (!$scope.enroll_form.videoUrl.$error.url && $scope.enroll.videoUrl) {
										var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
										var match = $scope.enroll.videoUrl.match(regExp);
										if (match && match[2].length == 11) {
											$('#preview').html('<iframe class="embed-responsive-item" width="300" height="168.75" src="//www.youtube.com/embed/' + match[2] + '" frameborder="0" allowfullscreen></iframe>');
										} else {
											return 'error';
										}
									}
								}
							})
					} else {
						ga('send', 'enroll page view (not login)');
						$scope.login = false
					}
				})
			}
			init();
			$scope.goToBulletin = function() {
				console.log($location.absUrl() === 'http://www.ntuepc.com/' || $location.absUrl() === 'http://localhost:3000/' || $location.absUrl() === 'http://ntuvrepc.herokuapp.com/')
				if ($location.absUrl() === 'http://www.ntuepc.com/' || $location.absUrl() === 'http://localhost:3000/' || $location.absUrl() === 'http://ntuvrepc.herokuapp.com/') {
					var someElement = angular.element(document.getElementById('bulletin'));
					$document.scrollToElement(someElement, 80, 2000);
				} else {
					$window.location.href = '/bulletin'
				}
			}
			$scope.image = function() {
				// bodyRef.addClass('ovh');
				filepicker.pick(function(InkBlob) {
					$scope.enroll.image = InkBlob.url
					alertify.success('image uploaded')
					$scope.$apply()
					// bodyRef.removeClass('ovh');
				});
				// bodyRef.removeClass('ovh');
			}
			$scope.$watch('enroll.videoUrl', function() {
				if (!$scope.enroll_form.videoUrl.$error.url && $scope.enroll.videoUrl) {
					var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
					var match = $scope.enroll.videoUrl.match(regExp);
					if (match && match[2].length == 11) {
						$('#preview').html('<iframe class="embed-responsive-item" width="300" height="168.75" src="//www.youtube.com/embed/' + match[2] + '" frameborder="0" allowfullscreen></iframe>');
					} else {
						return 'error';
					}
				}
			})
			$scope.next = function(page) {
				if (page === 1) {
					var require_name = $scope.enroll.name === undefined
					var require_school = $scope.enroll.school === undefined
					var require_major = $scope.enroll.major === undefined
					var require_year = $scope.enroll.year === undefined
					if (require_name || require_school || require_major || require_year) {
						alertify.error('Error, try again')
					} else {
						$scope.page = page + 1
					}
				} else if (page === 2) {
					var require_cellphone = !$scope.enroll.cellphone
					var require_image = !$scope.enroll.image
					var require_email = !$scope.enroll.email
					if (require_cellphone || require_image || require_email) {
						alertify.error('Error, try again')
					} else {
						$scope.page = page + 1
						$scope.enroll.user_id = $rootScope.current_user.id
						if ($scope.enrolled) {
							$http.put('/api/enrolls/' + $scope.enroll_id, $scope.enroll).success(function(data, status, headers, config) {
								$scope.enroll_id = data.id
							})
						} else {
							$http.post('/api/enrolls', $scope.enroll).success(function(data, status, headers, config) {
								$scope.enroll_id = data.id
								$scope.enrolled = true
							})
						}
					}
				} else {
					alertify.error('Error, refresh again')
				}
			}
			$scope.previous = function(page) {
				$scope.page = page - 1
			}
			$scope.finish = function(page) {
				if (page === 3) {
					var require_videoUrl = $scope.enroll.videoUrl === undefined
					var require_videoInfo = $scope.enroll.videoInfo === undefined
			var require_topic = $scope.enroll.topic === undefined
					if (require_videoUrl || require_videoUrl || $scope.enroll_form.videoUrl.$error.url) {
						alertify.error('Error, try again')
					} else {
						$scope.enroll.user_id = $rootScope.current_user.id
						$http.put('/api/enrolls/' + $scope.enroll_id, $scope.enroll).success(function(data, status, headers, config) {
							alertify.success('Thanks,' + data.name + '.And now wait for our email')
							$scope.open(data)
						})
					}
				} else {
					alertify.error('Error, refresh again')
				}
			}
			var bodyRef = angular.element($document[0].body);
			$scope.open = function(model) {
				bodyRef.addClass('ovh');
				ga('send', 'sign up finish');
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
