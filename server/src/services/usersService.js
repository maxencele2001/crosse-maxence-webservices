import User  from "#src/models/Users";
import bcrypt from "bcryptjs"
import queryBuilder from "#src/utils/mongoQueryBuilder";


const exposeServices = {

    findOneUserByEmail:async ({email})=>{
        try {
            const   findUser = await User.findOne({email})
            return  findUser
        } catch (error) {
            throw error
        }

    },
    findUserByRefreshToken:async ({refreshToken})=>{
        try {
            const   findUser = await User.findOne({refreshToken})
            return  findUser
        } catch (error) {
            throw error
        }
    },
    findAllUsers: async (query)=>{
        const {
            filter,
            projection,
            options
        } = queryBuilder.getFindOptions({query})
        try {
            const   allProjects = await User.find(filter,projection,options)
            return  allProjects
        } catch (error) {
            throw new Error(error)
        }
    },
    createUser: async (rawData)=>{
        const {password} = rawData
        const salt = bcrypt.genSaltSync(4);
        const hash = bcrypt.hashSync(password, salt);
        
        const newUserData = {
            ...rawData,
            password:hash
        }

        try {
            const   toSave  = new User(newUserData)
            const   newUser = toSave.save()   
            return  newUser
        } catch (error) {
            throw error
        }
    },
    updateUserToken: async ({userId,refreshToken})=>{
               
        const query = {
            _id:userId
        }
        const updateQ = {
            $set:{
                refreshToken
            }
        }
        try {
            const   toUpdate = await User.findOneAndUpdate(query,updateQ,{new:true})
            return  toUpdate
        } catch (error) {
            throw error
        }
    },
    patchUser: async ({id,body})=>{
        //TODO: rendre dynamique l'attribution du addToSet
        const {
            skills=false,
            ...rest
        } = body
        const updateQ = {
            $addToSet:{
                skills:{
                    $each:skills
                }
            },
            ...rest
        }
        try {
            const   patchProj  = await User.findOneAndUpdate(
                {_id:id},
                updateQ,
                {new:true}
            ) 
            return  patchProj
        } catch (error) {
            throw new Error(error)
        }
    }

}
export default exposeServices