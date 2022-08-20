import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

//https://stackoverflow.com/questions/45309447/calculating-median-javascript
function median(values){
    if(values.length ===0) throw new Error("No inputs");
  
    values.sort(function(a,b){
      return a-b;
    });
  
    var half = Math.floor(values.length / 2);
    
    if (values.length % 2)
      return values[half];
    
    return (values[half - 1] + values[half]) / 2.0;
  }



const StatisticStackedBar = ({ upperBound = new Date(), lowerBound = new Date() }) => {
    const moods = useSelector((state) => state.mood.value);
    const [terribleDays, setTerribleDays] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
    const [badDays, setBadDays] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
    const [okDays, setOkDays] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
    const [goodDays, setGoodDays] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
    const [greatDays, setGreatDays] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
    const [data, setData] = useState([]);
    const [width, setWidth] = useState(window.screen.width);
    useEffect(() => {
        window.addEventListener('resize', (event) => { setWidth(window.screen.width); });
      }, [])
    const counter = (setter, day) => {
        setter((state) => ({ ...state, [day]: state[day] + 1 }))
    }


    useEffect(() => {
        setTerribleDays({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
        setBadDays({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
        setOkDays({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
        setGoodDays({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
        setGreatDays({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });

        for (const year in moods.DateStorage) {
            for (const month in moods.DateStorage[year]) {
                for (const date in moods.DateStorage[year][month]) {
                    if (new Date(year, month, date) >= lowerBound && new Date(year, month, date) <= upperBound) {
                        switch (moods.DateStorage[year][month][date].mood) {
                            case "terrible":
                                counter(setTerribleDays, new Date(year, month, date).getDay());
                                break;
                            case "bad":
                                counter(setBadDays, new Date(year, month, date).getDay());
                                break;
                            case "ok":
                                counter(setOkDays, new Date(year, month, date).getDay());
                                break;
                            case "good":
                                counter(setGoodDays, new Date(year, month, date).getDay());
                                break;
                            case "great":
                                counter(setGreatDays, new Date(year, month, date).getDay());
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }


    }, [upperBound, lowerBound, moods.DateStorage])



    useEffect(() => {
        setData([
            { name: "Sun", Terrible: terribleDays[0], Bad: badDays[0], Okay: okDays[0], Good: goodDays[0], Great: greatDays[0] },
            { name: "Mon", Terrible: terribleDays[1], Bad: badDays[1], Okay: okDays[1], Good: goodDays[1], Great: greatDays[1] },
            { name: "Tue", Terrible: terribleDays[2], Bad: badDays[2], Okay: okDays[2], Good: goodDays[2], Great: greatDays[2] },
            { name: "Wed", Terrible: terribleDays[3], Bad: badDays[3], Okay: okDays[3], Good: goodDays[3], Great: greatDays[3] },
            { name: "Thurs", Terrible: terribleDays[4], Bad: badDays[4], Okay: okDays[4], Good: goodDays[4], Great: greatDays[4] },
            { name: "Fri", Terrible: terribleDays[5], Bad: badDays[5], Okay: okDays[5], Good: goodDays[5], Great: greatDays[5] },
            { name: "Sat", Terrible: terribleDays[6], Bad: badDays[6], Okay: okDays[6], Good: goodDays[6], Great: greatDays[6] }
        ])
    }, [terribleDays, badDays, okDays, goodDays, greatDays])


    return (
        <BarChart
        width={median([300, width*0.8, 500])}
        height={median([300, width*0.8, 400])}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Legend />
        <Tooltip />
        <Bar dataKey="Terrible" stackId="a" fill="#EB315F" />
        <Bar dataKey="Bad" stackId="a" fill="#E0932F" />
        <Bar dataKey="Okay" stackId="a" fill="#5937D4" />
        <Bar dataKey="Good" stackId="a" fill="#31E0EB" />
        <Bar dataKey="Great" stackId="a" fill="#53E12C" />
      </BarChart>
    )
}

export default StatisticStackedBar