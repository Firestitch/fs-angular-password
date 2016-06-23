'use strict';


angular.module('app')
  .controller('DemoCtrl', function ($scope, fsPassword,fsModal) {

  	$scope.user = { password: '' };

  	$scope.update = function() {
  		fsPassword.show({ username: 'ray' })
  		.then(function(password) {
  			$scope.user.password = password;
        //save()
  		},function() {
  			console.log("The user cancelled the password update");
  		});
  	}

  	$scope.modal = function() {

   		fsModal
            .show(  'DemoModalCtrl',
                    'views/passwordmodal.html')
            .finally(function() {

                if(data.confirm) {
                    defer.resolve(data.password);
                } else {
                    defer.reject();
                }
            });
  	}
    
})
.controller('DemoModalCtrl', function ($scope, fsPassword) {

	$scope.password = '';

  	$scope.update = function() {
		fsPassword.show()
		.then(function(password) {
			$scope.password = password;
		})
		.catch(function() {
			console.log("The user cancelled the password update");
		});
  	}

});
