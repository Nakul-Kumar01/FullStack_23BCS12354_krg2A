
import { useEffect } from "react"
import axiosClient from "../utils/axiosClient"
import { useState } from "react"


export default function Contest() {

    const [latestContest, setLatestContest] = useState([]);
    const [userContestHistory, setUserContestHistory] = useState([]);

    useEffect(() => {

        const fetchContest = async () => {
            const [response1, response2] = await Promise.all([
                axiosClient.get(`/contest/allContests`),
                axiosClient.get("/contest/:id/userContestHistory"),
            ]);
            setLatestContest(response1.data.contests);
            setUserContestHistory(response2.data.history);
        }
        fetchContest();
    }, []);
    
    return (
        <div>

        </div>
    )
}