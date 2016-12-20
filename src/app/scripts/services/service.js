(function () {
    'use strict';

    angular.module('fs-angular-password')
    .provider('fsPassword', function() {

        var _options = {
            validations: {
                minlength: { value: 6, message: 'Short passwords are easy to guess. Try one with at least {{minlength}} characters.' }
            }
        };

        this.options = function(value) {
            _options = angular.extend(_options,value);
        }

        this.$get = function(fsModal, $q) {

            var service = {
                show: show,
                options: options
            };

            return service;

            function show(options) {
                return $q(function(resolve,reject) {
                    fsModal
                    .show(  'FsPasswordModalCtrl',
                            'views/directives/passwordmodal.html',
                            {   preserveScope: true,
                                escapeToClose: false,
                                skipHide: true,
                                focusOnOpen: false,
                                clickOutsideToClose: false,
                                locals: { options: options } })
                    .then(function(password) {
                        if(password) {
                            resolve(password);
                        } else {
                            reject();
                        }
                    });
                });
            }

            function options() {
                return _options;
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