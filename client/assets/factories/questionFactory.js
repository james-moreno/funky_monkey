app.factory('questionFactory', ['$http', function($http){
    var user = {};
    var topic = {};
    var topics = [];
    function questionFactory(){
        this.new_question = function(question, user_id, callback){
            question.user_id = user_id;
            $http.post('/question/new', question).then(function(returnedData){
                if(typeof(callback) == 'function'){
                    callback(returnedData);
                }
            });
        };
        this.new_answer = function(newAnswer, question_id, user_id, callback){
            console.log(newAnswer);
            newAnswer.user_id = user_id;
            newAnswer.question_id = question_id;
            $http.post('/question/'+question_id, newAnswer).then(function(returned_data){
                if(typeof(callback) == 'function'){
                    callback(returned_data);
                }
            });
        };
        this.index = function(callback){
            $http.get('/index').then(function(returned_data){
                topics = returned_data.data;
                callback(topics);
            });
        };
        this.get_question = function(questionID, callback){
            $http.get('/question/'+questionID).then(function(returned_data){
                question = returned_data.data;
                callback(question);
            });
        };
        this.like = function(answerID, callback){
            console.log('liking answer');
            $http.post('/answer/'+answerID).then(function(returned_data){
                like = returned_data.data;
                callback(like);
            });
        };
    }
    return new questionFactory();
}]);
