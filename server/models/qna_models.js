var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    questions: [{type:mongoose.Schema.Types.ObjectId, ref: 'Question'}],
    answers: [{type:mongoose.Schema.Types.ObjectId, ref: 'Answer'}]
    },
    {timestamps: true}
);

var QuestionSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: {
        type: String,
        required: true,
        minlength: 10
    },
    description: String,
    answers: [{type:mongoose.Schema.Types.ObjectId, ref: 'Answer'}]
    },
    {timestamps: true}
);

var AnswerSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: {
        type: String,
        required: true,
        minlength: 5
    },
    details: String,
    likes: {
        type:Number,
        default: 0
        }
    },
    {timestamps: true}
);

mongoose.model('User', UserSchema);
mongoose.model('Question', QuestionSchema);
mongoose.model('Answer', AnswerSchema);
