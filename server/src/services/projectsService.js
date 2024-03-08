import Project from "#src/models/Projects";
import queryBuilder from "#src/utils/mongoQueryBuilder";

const exposeServices = {

    findOneProject: async ({id:_id})=>{
        try {
            const   oneProj = await Project.findOne({_id})
            return  oneProj
        } catch (error) {
            throw new Error(error)
        }
    },
    findAllProjects: async (query)=>{
        const {
            filter,
            projection,
            options
        } = queryBuilder.getFindOptions({query})
        
        try {
            const   allProjects = await Project.find(filter,projection,options)
            return  allProjects
        } catch (error) {
            throw new Error(error)
        }
    },
    findRecentsProjects: async (query)=>{
        const {limit} = queryBuilder.extractLimit(query);
        const {sort} = queryBuilder.extractSort('-createdAt');
        const options = {
            limit, sort
        }
        // ? ca ecrit bien limit 2 en vardump mais par contre ca en affiche plus que 2 alors que c'est le meme code que au dessus
        const {
            filter,
            projection,
        } = queryBuilder.getFindOptions({query})
        try {
            const   allProjects = await Project.find(filter,projection,options)
            return  allProjects
        } catch (error) {
            throw new Error(error)
        }
    },
    createProjects: async (rawData)=>{

        try {
            const   projToSave  = new Project(rawData)
            const   newProj     = projToSave.save()   
            return  newProj
        } catch (error) {
            throw new Error(error)
        }
    },
    updateProject: async ({id,body})=>{

        try {
            const   updatedProj  = await Project.findOneAndUpdate(
                {_id:id},
                body,
                {new:true}
            ) 
            return  updatedProj
        } catch (error) {
            throw new Error(error)
        }
    },
    patchProject: async ({id,body})=>{
        //TODO: rendre dynamique l'attribution du addToSet
        const {
            developers=false,
            ...rest
        } = body
        const updateQ = {
            $addToSet:{
                developers:{
                    $each:developers
                }
            },
            ...rest
        }
        try {
            const   patchProj  = await Project.findOneAndUpdate(
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