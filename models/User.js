import {Schema, model} from 'mongoose';

const User = new Schema({
    username:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default:'user'
    }
})


export default model('User',User);
