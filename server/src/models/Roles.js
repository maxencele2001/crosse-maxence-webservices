import mongoose from 'mongoose';
const { Schema } = mongoose;


const RolesSchema = new Schema({
    label: String
});

const roleModel = mongoose.model('roles',RolesSchema)

export default roleModel