import axios from 'axios';
import { delay } from 'msw';
import React, { useEffect, useState } from 'react'

const useFetchData = (url, fetchTriggerToggle) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(()=>{
        async function fetchData(url){

            if ("serviceWorker" in navigator) {

                navigator.serviceWorker.controller?.postMessage("MOCK_ACTIVATE");
                delay(10)
                .then(async () => {
                    setIsLoading(true)
                    try {
                        const response = await axios.get(url);
                        setData(response.data);
                    } catch (error) {
                        setError(error);
                    } finally{
                        setIsLoading(false);
                    }
                } 
                )
            }
        }

        fetchData(url);
      },[url, fetchTriggerToggle])

// console.log(error);
  return [data, isLoading, error, setData]
}

export default useFetchData
