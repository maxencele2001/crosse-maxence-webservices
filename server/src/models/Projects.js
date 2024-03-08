import mongoose, { now } from 'mongoose';
const { Schema } = mongoose;


const projectSchema = new Schema({
    name: String,
    developers: [Schema.Types.Mixed],
    publicationDate:{type:Date,default: Date.now},
    },
    { timestamps: true }
);

const projectModel = mongoose.model('projects',projectSchema)

export default projectModel