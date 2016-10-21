app.controller('newQuestionController', ['$scope', '$location', '$cookies', 'questionFactory', 'usersFactory', function($scope, $location, $cookies, questionFactory, usersFactory){
    var user_cookie = $cookies.get('user_id');
    $scope.user_cookie = user_cookie;
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
    $scope.home = function(){
        $location.url('/index');
    };
    $scope.new_question = function(){
        $scope.errors = {};
        questionFactory.new_question($scope.question, user_cookie, function(question){
            console.log(question);
            if(question.data.errors){
                $scope.errors = "Questions must be longer than 10 characters.";
            }
            else {
                $location.url('/index');
            }
        });
    };
}]);
