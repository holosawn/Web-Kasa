import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const useFetchData = (url) => {
    //todo integrate abortController
    const [data, setdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const cache = useRef({});
    const abortController = useRef(AbortController);


    useEffect(()=>{
        if (cache.current[url]) {
            setdata(cache.current[url])
        } else{
            async function fetchData(url){
                setIsLoading(true)
                try {
                    const response = await axios.get(url);
                    setdata(response.data);
                    cache.current[url] = response.data
                } catch (error) {
                    setError(error);
                } finally{
                    setIsLoading(false);
                }
            }

            fetchData(url);
        }
      },[url])


  return {data, error, isLoading}
}

export default useFetchData
