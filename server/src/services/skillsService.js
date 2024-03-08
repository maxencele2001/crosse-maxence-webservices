import Skill  from "#src/models/Skills";

const exposeServices = {
    findAllSkills: async ()=>{
        try {
            const   allSkills = await Skill.find()
            return  allSkills
        } catch (error) {
            throw error
        }
    },
    createSkill: async (rawData)=>{

        try {
            const   toSave  = new Skill(rawData)
            const   newSkill = toSave.save()   
            return  newSkill
        } catch (error) {
            throw error
        }
    },
}



export default exposeServices