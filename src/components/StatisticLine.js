import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const StatisticLine = ({ upperBound = new Date(), lowerBound = new Date() }) => {
    const moods = useSelector((state) => state.mood.value);
    const [data, setData] = useState([{date:"", mood: "Terrible"},{date:"", mood:"Bad"}, {date:"", mood:"Okay"}, {date:"", mood:"Good"}, {date:"", mood: "Great"}]);

    const quantifyMood = (mood) => {
        switch (mood) {
            case "terrible":
                return [-2, "Terrible"];
            case "bad":
                return [-1, "Bad"];
            case "ok":
                return [0, "Okay"];
            case "good":
                return [1, "Good"];
            case "great":
                return [2, "Great"];
            default:
                return [0, ""]
        }
    }

    useEffect(() => {
        setData([{date:"", mood: "Terrible"},{date:"", mood:"Bad"}, {date:"", mood:"Okay"}, {date:"", mood:"Good"}, {date:"", mood: "Great"}]);
        for (const year in moods.DateStorage) {
            for (const month in moods.DateStorage[year]) {
                for (const date in moods.DateStorage[year][month]) {
                    if (new Date(year, month, date) >= lowerBound && new Date(year, month, date) <= upperBound) {
                        const mood = quantifyMood(moods.DateStorage[year][month][date].mood)
                        setData(state => [...state, {
                            moodValue: mood[0],
                            mood: mood[1],
                            date: new Date(year, month, date).toDateString()
                        }])
                    }
                }
            }
        }


    }, [upperBound, lowerBound, moods.DateStorage])

    return (

        <div>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis type="category" dataKey="mood" />
                <Tooltip  />
                <Legend />
                <Line type="monotone" dataKey="mood" stroke="#5836d3" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    )
}

export default StatisticLine