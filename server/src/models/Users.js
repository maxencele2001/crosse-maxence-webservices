import mongoose from 'mongoose';
const { Schema } = mongoose;


const userSchema = new Schema({
    lastName : String, 
    firstName: String,
    email: { type:String,  required:'un email est obligatoire:)', unique:true },
    password:{ type:String },
    roles:[Schema.Types.ObjectId],
    skills: [Schema.Types.Mixed],
    refreshToken:String
},
{ timestamps: true }
);

const userModel = mongoose.model('users',userSchema)

export default userModel