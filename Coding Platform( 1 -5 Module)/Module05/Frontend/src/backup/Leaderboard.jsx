
import axiosClient from "../utils/axiosClient";
import { useEffect, useState } from "react";


export default function Leaderboard() {
    const [leaderboardUsers, setLeaderboardUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    const { user } = useSelector((state) => state.profile || {});

useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get(`/user/Leaderboard?page=${page}`);
      setLeaderboardUsers(data.users);
        setTotalUsers(data.totalUsers);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


    return (
        <>
        </>
    )
}