app.controller('loginController', ['$scope', '$location', '$cookies', 'usersFactory', function($scope, $location, $cookies, usersFactory){
    var cookie = $cookies.get('user_id');
    if(cookie){
        $location.url('/index');
    }
    $scope.login = function(){
        $scope.errors = {};
        usersFactory.login($scope.user, function(returnedData){
            console.log(returnedData);
            if (returnedData.data.errors){
                $scope.errors = returnedData.data.errors;
            }
            else {
                $cookies.put('user_id', returnedData.data._id);
                $location.url('/index');
            }
        });
    };

}]);
