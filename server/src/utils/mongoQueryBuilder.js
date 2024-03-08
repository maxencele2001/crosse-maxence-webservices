const queryBuilder = {

    getFindOptions({query}={}){
         
        const defaultLimit = 10
        const {
            fields=false,
            sort=false,
            page=1,
            limit=defaultLimit,
            ...rest
            } = query;
        const mongooseQuery      = this.extractQuery(rest)
        const mongooseProjection = this.extractSimpleProjection(fields)
        const mongooseSort       = this.extractSort(sort)
        const mongooseLimit      = this.extractLimit(limit)
        const mongooseSkip       = this.extractSkip(page, limit)

        const findObjectParams = {
            filter    :mongooseQuery,
            projection:mongooseProjection,
            options   :{
                ...mongooseSort,
                ...mongooseLimit,
                ...mongooseSkip
            }
        }
       
        console.log(JSON.stringify(findObjectParams, null, 2))
        return findObjectParams

    },
    extractLimit(limit){
        return {limit}
    },
    extractSkip(page, limit){
        return {skip: (page-1)*limit}
    },
    extractQuery(queryRest){
        //Todo: type validation 
        //Check if field exist on model cf >eachPath()
        return {...queryRest}
    },
    extractSort(sort){
        const sortOptions={}
        if(sort){
            if(sort.indexOf('-')>=0){
                const cleanParam=sort.slice(1,sort.length) // remove - from param names
                sortOptions[cleanParam]=-1
              }else{
                sortOptions[sort]=1
            }
        }
        return {sort:sortOptions}
    },
    // > https://mongoosejs.com/docs/api.html#query_Query-select
    extractSimpleProjection(fields){
        //Todo: handle exclude/include
        const projOptions={}
        if(fields){
            const fieldsList = fields.split(',');
            // for now, i'm taking only exclude value because everything is added by default as 06/11/22
            const onlyExclude = fieldsList.filter(elem=>elem.indexOf('-')>=0)
            onlyExclude.forEach((elem)=>{
                    const cleanParam=elem.slice(1,elem.length) // remove - from param names
                    projOptions[cleanParam] = 0 ;
                
            })
        }
        return projOptions
    },
}

export default queryBuilder