/*global $ */
/*global angular */
'use strict';

/* Directives */
angular.module('enroll.controller', [])
	.controller("enroll", ['$scope', '$http', '$window',
		function($scope, $http, $window) {
			function init() {
				console.log('enroll')
				$scope.page = 1;
				$scope.enroll = {}
				filepicker.setKey("APvIX7xbrQeyWbbxZ1bMbz");
				parallelism.init();
			}
			init();
			$scope.image = function() {
				filepicker.pick(function(InkBlob) {
					$scope.enroll.image = InkBlob.url
					alertify.success('image uploaded')
					$scope.$apply()
				});
			}
			$scope.$watch('enroll.videoUrl', function() {
				if (!$scope.form.videoUrl.$error.url && $scope.enroll.videoUrl) {
					var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
					var match = $scope.enroll.videoUrl.match(regExp);
					if (match && match[2].length == 11) {
						$('#youtubeCode').html('<iframe class="embed-responsive-item" width="300" height="168.75" src="//www.youtube.com/embed/' + match[2] + '" frameborder="0" allowfullscreen></iframe>');
					} else {
						return 'error';
					}
				}
			})
			$scope.next = function(page) {
				if (page === 1) {
					var require_name = !$scope.enroll.name
					var require_school = !$scope.enroll.school
					var require_major = !$scope.enroll.major
					var require_year = !$scope.enroll.year
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
					var require_videoUrl = !$scope.enroll.videoUrl
					var require_videoInfo = !$scope.enroll.videoInfo
					var require_topic = !$scope.enroll.topic
					if (require_videoUrl || require_videoUrl || require_topic || $scope.form.videoUrl.$error.url)
						alertify.error('Error, try again')
					else {
						$http.post('/api/enrolls', $scope.enroll).success(function(data, status, headers, config) {
							alertify.success('Enroll success, wait for email')
							alertify.success('Thanks,' + data.name)
						})
					}
				} else {
					alertify.error('Error, refresh again')
				}
			}
		}
	]);