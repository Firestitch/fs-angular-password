
(function () {
    'use strict';

    angular.module('fs-angular-password',['fs-angular-modal','fs-angular-validate'])
    .directive('fsPassword', function($location, $timeout) {
        return {

			restrict: 'A',
			replace: false,
	    	link: function($scope, element) {
	    		$timeout(function() { 
	    			angular.element(element[0].querySelectorAll('.password,.password-confirm'))
	    				.attr('type','password')
	    				.val('');
	    		},50);
	    	}
	    }
    })

})();
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
angular.module('fs-angular-password').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/password.html',
    "<md-dialog fs-password autocomplete=\"on\" aria-label=\"Password\" class=\"fs-password-dialog\">\r" +
    "\n" +
    "    <form fs-validate=\"save()\">\r" +
    "\n" +
    "        <input type=\"text\" value=\"{{options.username}}\" name=\"username\"/>\r" +
    "\n" +
    "        <md-toolbar>\r" +
    "\n" +
    "            <div class=\"md-toolbar-tools\">\r" +
    "\n" +
    "                <h2>Password Update</h2>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </md-toolbar>\r" +
    "\n" +
    "        <md-dialog-content>\r" +
    "\n" +
    "            <div class=\"md-dialog-content\">\r" +
    "\n" +
    "                <md-input-container class=\"md-block\">\r" +
    "\n" +
    "                    <label>Chose a new Password</label>\r" +
    "\n" +
    "                    <input type=\"password\" class=\"password\" ng-model=\"password\" required minlength=\"6\" minlength-message=\"Short passwords are easy to guess. Try one with at least 6 characters.\" autocomplete=\"off\" autofocus>\r" +
    "\n" +
    "                </md-input-container>\r" +
    "\n" +
    "                <md-input-container class=\"md-block\">\r" +
    "\n" +
    "                    <label>Confirm your Password</label>\r" +
    "\n" +
    "                    <input type=\"password\" class=\"password-confirm\" ng-model=\"password_confirm\" compare=\"password\" compare-message=\"These passwords don't match. Try again?\" required autocomplete=\"off\">\r" +
    "\n" +
    "                </md-input-container>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </md-dialog-content>\r" +
    "\n" +
    "        <md-dialog-actions layout=\"row\">\r" +
    "\n" +
    "            <span flex></span>\r" +
    "\n" +
    "            <md-button ng-click=\"cancel()\">\r" +
    "\n" +
    "                Cancel\r" +
    "\n" +
    "            </md-button>\r" +
    "\n" +
    "            <md-button type=\"submit\" class=\"md-accent md-raised\">\r" +
    "\n" +
    "                Update Password\r" +
    "\n" +
    "            </md-button>\r" +
    "\n" +
    "        </md-dialog-actions>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</md-dialog>\r" +
    "\n"
  );

}]);
