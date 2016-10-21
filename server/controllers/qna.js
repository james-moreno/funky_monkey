var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');

function UserController(){
    this.login = function(req, res){
        var user = User.create(req.body, function(err, userdata){
            if(err){
                User.findOne(req.body, function(err, userData){
                    res.json(err||userData);
                });
            }
            else{
                res.json(userdata);
            }
        });
    };
    this.get_user = function(req, res){
        User.findOne({_id: req.params.id}, function(err, userData){
            res.json(err||userData);
        });
    };
    this.new_question = function(req, res){
        Question.create({user: req.body.user_id, title: req.body.title, description: req.body.description, category: req.body.category}, function(err, question){
            if(err){
                res.json(err);
            }
            else{
                User.findOne({_id: req.body.user_id}, function(err, user){
                    user.questions.push(question._id);
                    user.save(function(err, user){
                        res.json(err||user);
                    });
                });
            }
        });
    };
    this.new_answer = function(req, res){
        Answer.create({user: req.body.user_id, title: req.body.title, details: req.body.details}, function(err, answer){
            if(err){
                res.json(err);
            }
            else{
                User.findOne({_id: req.body.user_id}, function(err, user){
                    user.answers.push(answer._id);
                    user.save(function(err, user){
                        Question.findOne({_id: req.params.id}, function(err, question){
                            question.answers.push(answer._id);
                            question.save(function(err, question){
                                res.json(err||question);
                            });
                        });
                    });
                });
            }
        });
    };
    this.like = function(req, res){
        Answer.findOne({_id: req.params.id}, function(err, answer){
            answer.likes += 1;
            answer.save(function(err, answer){
                res.json(err||answer);
            });
        });
    };
    this.index = function(req, res){
        Question.find({}).populate("user").exec(function(err, questions){
            res.json(err||questions);
        });
    };
    this.get_question = function(req, res){
        Question.findOne({ _id : req.params.id})
        .populate("user")
        .populate({
            path: "answers",
            model: "Answer",
            populate: {
                path: "user",
                model: "User"
            }
        })
        .exec(function (err, question){
            res.json(err||question);
        });
    };
}
module.exports = new UserController();
