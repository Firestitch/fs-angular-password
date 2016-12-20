
(function () {
    'use strict';

    angular.module('fs-angular-password',['fs-angular-modal','fs-angular-validate','fs-angular-util'])
    .directive('fsPassword', function($timeout, fsPassword, fsUtil) {
        return {
			templateUrl: 'views/directives/password.html',
			restrict: 'E',
			replace: false,
			scope: {
				password: '=fsModel'
			},
			controller: function($scope) {

				$scope.validations = fsPassword.options().validations;

				$scope.compare = function(compare) {
					if($scope.passwordElement.val()!=compare)
						return 'These passwords don\'t match. Try again?';

					return true;
				}

				$scope.names = { 	password: 'password_' +fsUtil.guid(),
									password_confirm: 'password_confirm_' +fsUtil.guid() };
			},
	    	link: function($scope, element) {

	    		$scope.passwordElement = angular.element(element[0].querySelector('input[name="password"]'));
	    		$scope.passwordConfirmElement = angular.element(element[0].querySelector('input[name="password_confirm"]'));
	    		$scope.passwordConfirmElement.data('scope',$scope);

	    		$timeout(function() {
	    			angular.element(element[0].querySelectorAll('.password input,.password-confirm input'))
	    				.on('focus',function() {
	    					angular.element(this).removeAttr('readonly'); //tricks Chrome to think its readonly and not autofill
	    				})
	    				.attr('type','password')
	    				.val('') //removes yellow autofill background
	    				.focus();
	    		},500);
	    	}
	    }
    })

})();
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
angular.module('fs-angular-password').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/password.html',
    "<div class=\"password\">\r" +
    "\n" +
    "\t<md-input-container>\r" +
    "\n" +
    "\t    <label>Chose a new Password</label>\r" +
    "\n" +
    "\t    <input type=\"text\" ng-model=\"password\" name=\"password\" minlength=\"{{validations.minlength.value}}\" minlength-message=\"{{validations.minlength.message}}\" autocomplete=\"off\" required autofocus/>\r" +
    "\n" +
    "\t</md-input-container>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"password-confirm\">\r" +
    "\n" +
    "\t<md-input-container>\r" +
    "\n" +
    "\t    <label>Confirm your Password</label>\r" +
    "\n" +
    "\t    <input type=\"text\" ng-model=\"password_confirm\" name=\"password_confirm\" custom=\"compare\" autocomplete=\"off\" required/>\r" +
    "\n" +
    "\t</md-input-container>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );

}]);
