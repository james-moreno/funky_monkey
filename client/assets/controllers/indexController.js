app.controller('indexController', ['$scope', '$location', '$cookies', 'questionFactory', 'usersFactory', function($scope, $location, $cookies, questionFactory, usersFactory){
    var user_cookie = $cookies.get('user_id');
    if(!user_cookie){
        $location.url('/');
    }
    else {
        usersFactory.get_user(user_cookie, function(data){
            console.log(data);
            $scope.user = data;
        });

    }
    $scope.logout = function(){
        $cookies.remove('user_id');
        $location.url('/');
    };
    $scope.questions = [];
    var questions = function() {
        questionFactory.index(function(questions) {
            console.log(questions);
            $scope.questions = questions;
        });
    };
    questions();
}]);
