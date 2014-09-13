/*global $ */
/*global angular */
'use strict';

/* Directives */
angular.module('myApp.controller', [])
  .controller("myApp", ['$scope', '$http', '$window', '$rootScope',
    function($scope, $http, $window, $rootScope) {
      $http.get('/get_current_user').success(function(data, status, headers, config) {
        if (!data.msg) {
          $rootScope.current_user = data
        }
      })
      filepicker.setKey("APvIX7xbrQeyWbbxZ1bMbz");
      $scope.image = function() {
        filepicker.pick(function(InkBlob) {
          $scope.image = InkBlob.url
          alertify.success('image uploaded')
          $scope.$apply()
          return InkBlob.url
        });
      }
    }
  ]);
