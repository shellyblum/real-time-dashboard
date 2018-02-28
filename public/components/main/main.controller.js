(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$localStorage', 'socket', '$rootScope', '$window', 'lodash'];

  function MainCtrl($scope, $localStorage, socket, $rootScope, $window, lodash) {
    $scope.initUsers = [];
    $scope.users = [];
    // $scope.online = true;
    $scope.mynickname = $localStorage.nickname;
    let nickname = $scope.mynickname;
    $rootScope.online = $window.navigator.onLine; //returns true || false

    socket.emit('get-initUsers');
    socket.emit('get-users');

    socket.on('all-initUsers', function(data) {
      $scope.initUsers = data;
    })

    socket.on('all-users', function(data) {

      $scope.users = data;

      // console.log($scope.users);
      // for (let i=0; i<$scope.users.length; ++i) {
      //   console.log($scope.users[i]);

      //   if (!$scope.users[i].online) {
      //     socket.emit('disconnect', $scope.users[i]);
      //   }
      // }
    });

    // $window.addEventListener("offline", function() {
    //   $rootScope.$apply(function() {
    //     $rootScope.online = false;
    //   });
    // }, false);

    // $window.addEventListener("online", function() {
    //   $rootScope.$apply(function() {
    //     $rootScope.online = true;
    //   });
    // }, false);


    // socket.on('turn-red', function(user) {
    //   console.log(user);
    //   // checkOffline = function (user) {
    //   //   if (!user.online) {
    //   //     return 'offline';
    //   //   }
    //   // }
    // })

    socket.on('update', function(data) {
      console.log(data);
      // $scope.users = [];
      // $scope.users = data.filter(function(item) {
      //   return item.nickname !== nickname;
      // });
      user.online = true;

      // $rootScope.$watch('online', function(newValue, oldValue, scope) {
      //   $scope.users.forEach(user => {
      //     user.online = false;
      //     });
      //   // socket.emit('turn-red', function(user) {
      //   //   user.forEach(element => {
      //   //     element.online = false;
      //   //   });
      //   // })   
      // }, true);
    });

  };
})();