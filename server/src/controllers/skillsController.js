import skillsService from '#src/services/skillsService'


const exposeController = {

    allSkills:async (req,res)=>{
        const allSkills = await skillsService.findAllSkills()
        return res.json(allSkills)
    },
    createSkill:async (req,res)=>{
        const {body}  = req
        try {
                const registeredSkill = await skillsService.createSkill(body)     
                return res.json(registeredSkill)
            } catch (error) {
                console.log(error)
               return res.sendStatus(400)
            // return res.json({error})
        }
        
    }


}

export default exposeController