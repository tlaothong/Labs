// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'demo'])
    .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            window.StatusBar.styleDefault();
        }
    });
})
    .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
        .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })
        .state('app.browse', {
        url: '/browse',
        views: {
            'menuContent': {
                templateUrl: 'templates/browse.html'
            }
        }
    })
        .state('app.playlists', {
        url: '/playlists',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlists.html',
                controller: 'PlaylistsCtrl as cx',
                resolve: {
                    "playlists": ['demo.DataService', function (svc) { return svc.getAll(); }]
                }
            }
        }
    })
        .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlist.html',
                controller: 'PlaylistCtrl as cx',
                resolve: {
                    "playlistId": ['$stateParams', function (p) { return p.playlistId; }]
                }
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/playlists');
});
angular.module('starter.controllers', [])
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    // Form data for the login modal
    $scope.loginData = {};
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };
    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };
    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
});
var demo;
(function (demo) {
    //.controller('PlaylistsCtrl', function ($scope) {
    //    $scope.playlists = [
    //        { title: 'Reggae', id: 1 },
    //        { title: 'Chill', id: 2 },
    //        { title: 'Dubstep', id: 3 },
    //        { title: 'Indie', id: 4 },
    //        { title: 'Rap', id: 5 },
    //        { title: 'Cowbell', id: 6 }
    //    ];
    //});
    //.controller('PlaylistCtrl', function ($scope, $stateParams) {
    //    });
    var PlaylistsCtrl = (function () {
        function PlaylistsCtrl(playlists) {
            this.playlists = playlists;
        }
        PlaylistsCtrl.$inject = ['playlists'];
        return PlaylistsCtrl;
    })();
    var PlaylistCtrl = (function () {
        function PlaylistCtrl(playlistId, svc, $state) {
            this.playlistId = playlistId;
            this.$state = $state;
            //alert(playlistId);
            //alert(svc.get(playlistId));
            this.data = svc.get(playlistId);
        }
        PlaylistCtrl.prototype.showP = function (id) {
            alert(id);
            this.$state.go('app.single', { playlistId: id });
        };
        PlaylistCtrl.$inject = ['playlistId', 'demo.DataService', '$state'];
        return PlaylistCtrl;
    })();
    angular.module('starter.controllers')
        .controller('PlaylistCtrl', PlaylistCtrl)
        .controller('PlaylistsCtrl', PlaylistsCtrl);
})(demo || (demo = {}));
var demo;
(function (demo) {
    'use strict';
    var DataService = (function () {
        function DataService($resource) {
            this.$resource = $resource;
            // TODO: initialize service
            this.svc = $resource('http://moman.azurewebsites.net/mgw/api/' + 'demo1');
        }
        DataService.prototype.getAll = function () {
            // TODO: Implement or remove a method
            return this.svc.query().$promise;
        };
        DataService.prototype.get = function (id) {
            return this.svc.get({ id: id });
        };
        DataService.$inject = ['$resource'];
        return DataService;
    })();
    demo.DataService = DataService;
    angular
        .module('demo', ['ngResource'])
        .service('demo.DataService', DataService);
})(demo || (demo = {}));
//# sourceMappingURL=appBundle.js.map