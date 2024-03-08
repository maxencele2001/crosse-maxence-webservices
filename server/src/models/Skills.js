import mongoose from 'mongoose';
const { Schema } = mongoose;


const SkillsSchema = new Schema({
    label: String
});

const skillModel = mongoose.model('skills',SkillsSchema)

export default skillModel