/*global $ */
/*global angular */
'use strict';

/* Directives */
angular.module('enroll.controller', [])
	.controller("enroll", ['$scope', '$http', '$window', '$rootScope', '$document', '$modal',

		function($scope, $http, $window, $rootScope, $document, $modal) {
			function init() {
				console.log('enroll')
				$http.get('/get_current_user').success(function(data, status, headers, config) {
					console.log(data)
					$rootScope.current_user = data
					$scope.page = 1;
					$scope.enroll = {}
					filepicker.setKey("APvIX7xbrQeyWbbxZ1bMbz");
					$scope.enroll.name = $rootScope.current_user.name
					$scope.enroll.email = $rootScope.current_user.email
				})
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
						$('#preview').html('<iframe class="embed-responsive-item" width="300" height="168.75" src="//www.youtube.com/embed/' + match[2] + '" frameborder="0" allowfullscreen></iframe>');
					} else {
						return 'error';
					}
				}
			})
			$scope.next = function(page) {
				$scope.page = page + 1
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