'use client';

import Spinner from "@/components/Spinner";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import moment from 'moment';
import { formatTime } from "@/lib/functions";
import { baseURL } from "@/constants/data";

const PollPage = () => {
    const { id } = useParams();
    const [poll, setPoll] = useState({});
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState("");
    const [timerExpired, setTimerExpired] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const fetchPollData = async () => {
            try {
                const response = await fetch(`${baseURL}/api/poll/${id}`);
                const data = await response.json();
                console.log('API Response:', data);
                setPoll(data || {});
                setLoading(false);

                const expiresAt = moment(data.expiresAt);
                const interval = setInterval(() => {
                    const now = moment();
                    const duration = moment.duration(expiresAt.diff(now));
                    if (duration.asSeconds() <= 0) {
                        clearInterval(interval);
                        setTimer("00:00:00");
                        setTimerExpired(true);
                    } else {
                        setTimer(formatTime(duration));
                    }
                }, 1000);

                return () => clearInterval(interval);
            } catch (error) {
                console.log('Fetch Error:', error);
                setLoading(false);
            }
        };

        fetchPollData();
    }, [id]);

    const handleOptionClick = (optionId) => {
        if (poll.pollType === "single-choice" && selectedOption === optionId) return;

        if (poll.pollType === "single-choice") {
            setSelectedOption(optionId);
        }
        const updatedPoll = { ...poll, selectedOption: optionId };
        const { options } = updatedPoll
        const targetOption = options.find(option => option.optionId = optionId)
        targetOption.votes += 1
        const { _id, ...pollData } = updatedPoll
        console.log(updatedPoll)
        fetch(`/api/poll/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pollData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Poll updated:', data);
                setPoll(updatedPoll);
            })
            .catch(error => {
                console.log('Error updating poll:', error);
            });

    };


    if (loading) return <Spinner />;
    if (!Object.keys(poll).length) return <div>No posts found</div>;

    return (
        <div className="flex justify-center items-center mt-20">
            <div className="max-w-xl w-full p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
                <p className="text-3xl text-center font-semibold">{poll.title}</p>
                <div className="mt-4 text-center font-medium text-lg">
                    <p>Time Left: {timer}</p>
                </div>

                <div className="mt-4">
                    {poll.options?.length > 0 ? (
                        poll.options.map((option) => (
                            <div
                                key={option.optionId}
                                className="p-3 border rounded-md mt-2 flex justify-between items-center"
                                onClick={() => handleOptionClick(option.optionId)}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: poll.pollType === 'single-choice' && selectedOption === option.optionId ? '#e0e0e0' : 'transparent'
                                }}
                            >
                                <span className="font-medium">{option.text}</span>
                                <span className="text-gray-500">
                                    {poll.isResultsHidden && !timerExpired ? 'Votes: Hidden' : `Votes: ${option.votes}`}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No options available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PollPage;
