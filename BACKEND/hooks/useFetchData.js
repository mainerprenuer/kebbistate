import axios from "axios";
import { useState, useEffect } from "react";


function useFetchData(apiEndpoint){
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if(initialLoad) {
            setInitialLoad(false);
            setLoading(false);
            return;
        }

        setLoading(true);

        const fetchAllData = async () => {
            try {
               const res = await axios.get(apiEndpoint) ;
               const allData = res.data;
               setAllData(allData);
               console.log("data", allData)
               setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }

        //fetch news data only if category exists
        if (apiEndpoint){
            fetchAllData()
        }
        
    }, [initialLoad, apiEndpoint]); //depend on the initialLoad and endpoint to trigger api call

    return {allData, loading}

}

export default useFetchData;