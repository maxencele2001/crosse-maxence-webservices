import usersService from '#src/services/usersService'


const exposeController = {

    allUsers:async (req,res)=>{
        const {query} = req
        const allUsers = await usersService.findAllUsers(query)
        return res.json(allUsers)
    },
    createUser:async (req,res)=>{
        const {body}  = req
        try {
                const registeredUser = await usersService.createUser(body)     
                return res.json(registeredUser)
            } catch (error) {
               return res.sendStatus(400)
            // return res.json({error})
        }
        
    },

    patchUser:async (req,res)=>{
        const {body}  = req
        const {id}    = req.params
        try {
                const registeredUser = await usersService.patchUser({id,body})     
                return res.json(registeredUser)
            } catch (error) {
               return res.sendStatus(400)
            // return res.json({error})
        }
        
    }


}

export default exposeController