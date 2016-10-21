app.controller('newAnswerController', ['$scope', '$routeParams', '$location', '$cookies', 'questionFactory', 'usersFactory', function($scope, $routeParams, $location, $cookies, questionFactory, usersFactory){
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
    var get_question = function(){
        questionFactory.get_question($routeParams.id, function(returnedData){
            console.log(returnedData);
            $scope.question = returnedData;
        });
    };
    $scope.new_answer = function(){
        $scope.errors = {};
        if(!$scope.answer){
            $scope.errors = "Answer must be longer than 5 characters.";
        }
        else {
            questionFactory.new_answer($scope.answer, $scope.question._id, user_cookie, function(answer){
                console.log(answer);
                if(answer.data.errors){
                    $scope.errors = "Answer must be longer than 5 characters.";
                }
                else {
                    $location.url('/index');
                }
            });
        }
    };
    get_question();
}]);
