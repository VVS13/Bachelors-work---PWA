
import {useState, useCallback} from 'react' 

export const useHttp = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback( async (url, method = 'GET', body = null, headers = {}) => {
        //hook that compliments useCallback
        setLoading(true)
        //when request is being performed sets loading status to true
        try{

            if (body){
                body = JSON.stringify(body) 
                headers['Content-Type'] = 'application/json'
            } 
            
            const response = await fetch (url, {method,body,headers})
            //returns whatever will be in response from backend upon fetching
            const data = await response.json()
            //changes response format to json

            if(!response.ok){
                throw new Error(data.message || 'asdasdasd')
            }

            setLoading(false)
            //when request has completed sets loading to false

            return data
            //returns response of fetch in json format

        }catch(e){
            setLoading(false)
            //when request has completed sets loading to false
            setError(e.message)
            throw e 
        }
    },[]) 
    const clearError = () => setError(null)
    return { loading, request, error, clearError }
}