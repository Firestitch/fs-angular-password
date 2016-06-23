(function () {
    'use strict';

    angular.module('fs-angular-password')
    .provider('fsPassword', function() {
    
        this.options = function(value) {
            _options = angular.extend(_options,value);
        }

        this.$get = function(fsModal, $q) {

            var service = {
                show: show
            };

            return service;

            function show(options) {
                
                var defer = $q.defer();
                fsModal
                .show(  'FsPasswordModalCtrl',
                        'views/directives/password.html',
                        {   preserveScope: true,
                            escapeToClose: false,
                            skipHide: true,
                            focusOnOpen: false,
                            clickOutsideToClose: false,
                            locals: { options: options } })
                .then(function(password) {
                    if(password) {
                        defer.resolve(password);
                    } else {
                        defer.reject();
                    }
                });

                return defer.promise;
            }
        };
    })
    .controller('FsPasswordModalCtrl', function($scope, fsModal, options) {
        $scope.options = options;

        $scope.save = function() {
            fsModal.hide($scope.password);
        }

        $scope.cancel = function() {
            fsModal.hide();
        }
    });
})();