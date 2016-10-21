var qna = require('../controllers/qna.js');
module.exports = function(app){
    app.post('/qna/login', qna.login);
    app.get('/user/:id', qna.get_user);
    app.post('/question/new', qna.new_question);
    app.get('/index', qna.index);
    app.get('/question/:id', qna.get_question);
    app.post('/question/:id', qna.new_answer);
    app.post('/answer/:id', qna.like);
};
