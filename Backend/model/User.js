import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    bio:{
        type:String
    },
    favorites:[
        {
            type:mongoose.Schema.Types.ObjectId,ref:'Recipe'
        }
    ]
        
    
});

const User = mongoose.model('User', UserSchema);

export default User;
