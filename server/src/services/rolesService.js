import Role  from "#src/models/Roles";

const exposeServices = {
    findOneRoleById:async ({id: _id})=>{
        try {
            const   findRole = await Role.findOne({_id})
            return  findRole
        } catch (error) {
            throw error
        }

    },
}



export default exposeServices