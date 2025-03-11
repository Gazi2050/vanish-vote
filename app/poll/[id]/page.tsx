'use client'

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const page = () => {
    const { id } = useParams();
    const [poll, setPoll] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/api/poll/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log('API Response:', data);
                setPoll(data || {});
                setLoading(false);
            })
            .catch((error) => {
                console.log('Fetch Error:', error);
                setLoading(false);
            });
    }, [id]);

    console.log('Posts state:', poll);

    if (loading) return <div>Loading...</div>;
    if (!Object.keys(poll).length) return <div>No posts found</div>;

    return (
        <div className="bg-white">
            <p className="text-red-600">{poll.title}</p>
        </div>
    );
};

export default page;
