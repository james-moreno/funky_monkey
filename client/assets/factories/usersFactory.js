app.factory('usersFactory', ['$http', function($http){
    var user = {};
    function usersFactory(){
        this.login = function(loginUser, callback){
            console.log('running factory');
            $http.post('qna/login', loginUser).then(function(returnedData){
                if(typeof(callback) == 'function'){
                    callback(returnedData);
                }
            });
        };
        this.get_user = function(cookieID, callback){
            $http.get('user/'+cookieID, cookieID).then(function(returnedData){
                if(typeof(callback) == 'function'){
                    callback(returnedData);
                }
            });
        };
    }
    return new usersFactory();
}]);
