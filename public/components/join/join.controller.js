(function() {
  'use strict';

  angular
    .module('app')
    .controller('JoinCtrl', JoinCtrl);

  JoinCtrl.$inject = ['$location', '$scope', '$localStorage', 'socket', '$http', '$window', '$rootScope'];

  function JoinCtrl($location, $scope, $localStorage, socket, $http, $window, $rootScope) {
    const self = this;
    const url = "//freegeoip.net/json/";
    let nickname;
    $scope.name = '';
    $http.get(url).then(function (res) {
      $scope.ip = res.data.ip;
      $scope.timeZone = res.data.time_zone;
      console.log( res.data.ip);
      console.log( res.data.time_zone);
    });
    
    $scope.type = $window.navigator.appCodeName;
    $scope.localTime = new Date();
    $scope.os = $window.navigator.platform;
    $rootScope.online = $window.navigator.onLine; //returns true || false
    $scope.users = [];


    $scope.join = function() {
      nickname = $scope.name;
      $localStorage.nickname = nickname;

      socket.emit('join', {
        nickname: nickname,
        ip: $scope.ip,
        type: $scope.type,
        os: $scope.os,
        localTime: $scope.localTime,
        timeZone: $scope.timeZone,
        online: $scope.online
      });

      $location.path('/main');
    }

  }
})();