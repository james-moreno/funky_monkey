app.controller('showController', ['$scope', '$routeParams', '$location', '$cookies', 'questionFactory', 'usersFactory', function($scope, $routeParams, $location, $cookies, questionFactory, usersFactory){
    var user_cookie = $cookies.get('user_id');
    $scope.user_cookie = user_cookie;
    if(!user_cookie){
        $location.url('/');
    }
    else {
        usersFactory.get_user(user_cookie, function(data){
            $scope.user = data;
        });
    }
    $scope.logout = function(){
        $cookies.remove('user_id');
        $location.url('/');
    };
    $scope.home = function(){
        $location.url('/index');
    };
    var get_question = function(){
        questionFactory.get_question($routeParams.id, function(returnedData){
            console.log(returnedData);
            $scope.question = returnedData;
        });
    };
    $scope.like = function(id){
        questionFactory.like(id, function(like){
            if (like.errors){
                $scope.errors = answer.errors;
            }
            else {
                $scope.errors = {message: 'Like Successful!'};
                get_question();
            }
        });
    };
    get_question();
}]);
