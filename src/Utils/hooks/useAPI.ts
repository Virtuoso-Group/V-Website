import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../config/config";


const VirtuosoClient = axios.create
(
    {
        baseURL,
        timeout: 10000,
    }
)

const useAPI = <Result>(url: string, method: 'get' | 'post', defaultValue: Result) =>
{
    const controller = new AbortController();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Result>(defaultValue);

    const execute = async (id = "") =>
    {        
        if (isLoading) 
        {
            return
        }           
        
        setLoading(true);
        
        try 
        {
            const response = await VirtuosoClient[method]<Result>(url + (id),
            {
                signal: controller.signal
            })

            if (response.status === 200) 
            {
                setData(response.data)
            }
            
            setLoading(false);
        } 
        catch (e) 
        {
            setLoading(false);
            const error = e as AxiosError;

            // console.log("error: ", error);

            if (error.status === 400) 
            {
                // console.log("Bad request!");
            }
        }
    }

    const reset = () =>
    {
        setLoading(false);
        setData(defaultValue)
    }

    useEffect(() => 
    {
        return () => { controller.abort() }
    }, []);


    return {
        data,

        isLoading,

        execute,
        reset
    }
}

export default useAPI;