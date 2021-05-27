//import { response } from 'express'
import {useState, useCallback} from 'react' //useCallback
//usecallback so my requests dont loop

//response because there is validation on the server side, and we wait for answer from it, ...
//...if it passed all validations there then continues working here

//usestate just setters for futher use in front end 

export const useHttp = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    // useEffect(async () => {
    //     const name = await fetch('URL_THAT_GETS_YOU_RANDOM_TEXT', {
    //         method: 'GET' // this is default, here you can specify 'POST' or other CRUD operations
    //         body: '' // in case you're posting something, with GET requests this is not needed
    //         headers: { } // headers if needed
    //     })
    //     .text(); // this could be .json(), if your backend returns json data

    //     setName(name);
    // }, [setName])




    // const request1 = useEffect(() => {
    //     (async (url, method = 'GET', body = null, headers = {}) =>{
    //         setLoading(true)
    //     try{
    //         const response = await fetch (url, {method,body,headers})
    //         const data = await response.json()

    //         if(!response.ok){
    //             throw new Error(data.message || 'asdasdasd')
    //         }

    //         setLoading(false)

    //         return data

    //     }catch(e){
    //         setLoading(false)
    //         setError(e.message)
    //         throw e
    //     }
    //     })()
    // })


    

    const request = useCallback( async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)

        //console.log('bdy in hook', body )
        //if body exists stringify 
        
        try{

            if (body){
                body = JSON.stringify(body) 
                headers['Content-Type'] = 'application/json'
            } 
            
            const response = await fetch (url, {method,body,headers})
            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || 'asdasdasd')
            }

            setLoading(false)

            return data

        }catch(e){
            setLoading(false)
            setError(e.message)
            throw e 
        }
    },[]) //are there any dependecies 
    const clearError = () => setError(null)
    return { loading, request, error, clearError }
}