import {verifyJwt}    from '#src/utils/jwtoken';

import roleService from "#src/services/rolesService";


const exposeMiddleware = {

    protect:async (req,res,next)=>{
        const accessToken  = req.headers['authorization'];

        if (!accessToken) {
            return res.status(401).send('Unauthorized');
        }
        if(accessToken.startsWith('Bearer ')) {
            // Remove Bearer from string
            const cleanAccess = accessToken.slice(7, accessToken.length);
            try {
                const verify = verifyJwt(cleanAccess)
                return next()
            } catch (error) {
                console.log(error.message)
                return res.status(401).send('Unauthorized')
            }
        }
        return res.sendStatus(400)
        
    },
    isAdmin:async (req,res,next)=>{
        const accessToken  = req.headers['authorization'];
        let is_admin = false;

        if (!accessToken) {
            return res.status(401).send('Unauthorized');
        }
        if(accessToken.startsWith('Bearer ')) {
            // Remove Bearer from string
            const cleanAccess = accessToken.slice(7, accessToken.length);
            try {
                const verify = verifyJwt(cleanAccess)
                const {roles} = verify
                for (let i = 0; i < roles.length; i++) {
                    const id = roles[i];
                    const role = await roleService.findOneRoleById({id})
                    if (role.label == 'ADMIN') {
                        is_admin = true;
                        break;
                    }
                    
                }
                if (!is_admin) return res.status(401).send('Unauthorized')
                return next()
            } catch (error) {
                return res.status(401).send('Unauthorized')
            }
        }
        return res.sendStatus(400)
        
    }
}

export default exposeMiddleware