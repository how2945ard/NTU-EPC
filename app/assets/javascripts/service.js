'use strict';

angular.module('myApp.services', []).
factory('loginService', ['$http', '$rootScope',
  function($http, $rootScope) {
    var loginService = {
      isLogin: false
    };

    loginService.setIsLogin = function(dataIsLogin) {
      // console.log(dataIsLogin);
      if (dataIsLogin) $rootScope.isLogin = true;
      loginService.isLogin = dataIsLogin;

      //redirect到首頁
      window.location = "/";


    }

    loginService.iniCheckLogin = function() {

    }

    loginService.Login = function() {
      $http({
        method: 'GET',
        url: '/auth/facebook'
      }).
      success(function(data, status, headers, config) {
        console.log(data);
        loginService.setIsLogin(data.isLogin);
        return loginService.isLogin;
      }).
      error(function(data, status, headers, config) {
        return loginService.isLogin;
      });
    }

    loginService.logout = function() {
      $http({
        method: 'GET',
        url: '/signout'
      }).
      success(function(data, status, headers, config) {
        loginService.setIsLogin(data.isLogin);
        return loginService.isLogin;
      }).
      error(function(data, status, headers, config) {
        return loginService.isLogin;
      });
    }
    return loginService;
  }
])