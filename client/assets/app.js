var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider) {
$routeProvider
    .when('/', {
        templateUrl: 'partials/login.html',
        controller: 'loginController'
    })
    .when('/index', {
        templateUrl: 'partials/index.html',
        controller: 'indexController'
    })
    .when('/new_question', {
        templateUrl: 'partials/newQuestion.html',
        controller: 'newQuestionController'
    })
    .when('/:id/new_answer', {
        templateUrl: 'partials/newAnswer.html',
        controller: 'newAnswerController'
    })
    .when('/question/:id', {
        templateUrl: 'partials/show.html',
        controller: 'showController'
    })
    .otherwise({
        redirectTo: '/'
    });
});
