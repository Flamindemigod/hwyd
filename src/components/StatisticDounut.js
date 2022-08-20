import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { PieChart, Pie, Sector, Cell } from 'recharts';

//https://stackoverflow.com/questions/45309447/calculating-median-javascript
function median(values) {
  if (values.length === 0) throw new Error("No inputs");

  values.sort(function (a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2)
    return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} Days`}</text>

    </g>
  );
};

const StatisticDounut = ({ upperBound = new Date(), lowerBound = new Date() }) => {
  const moods = useSelector((state) => state.mood.value);
  const [terribleDays, setTerribleDays] = useState(0);
  const [badDays, setBadDays] = useState(0);
  const [okDays, setOkDays] = useState(0);
  const [goodDays, setGoodDays] = useState(0);
  const [greatDays, setGreatDays] = useState(0);
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [width, setWidth] = useState(window.screen.width);

  useEffect(() => {
    window.addEventListener('resize', (event) => { setWidth(window.screen.width); });
  }, [])
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  const counter = (setter) => {
    setter((state) => (state + 1))
  }

  useEffect(() => {
    setTerribleDays(0);
    setBadDays(0);
    setOkDays(0);
    setGoodDays(0);
    setGreatDays(0);

    for (const year in moods.DateStorage) {
      for (const month in moods.DateStorage[year]) {
        for (const date in moods.DateStorage[year][month]) {
          if (new Date(year, month, date) >= lowerBound && new Date(year, month, date) <= upperBound) {
            switch (moods.DateStorage[year][month][date].mood) {
              case "terrible":
                counter(setTerribleDays);
                break;
              case "bad":
                counter(setBadDays);
                break;
              case "ok":
                counter(setOkDays);
                break;
              case "good":
                counter(setGoodDays);
                break;
              case "great":
                counter(setGreatDays);
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
      { name: "Terrible", value: terribleDays },
      { name: "Bad", value: badDays },
      { name: "Okay", value: okDays },
      { name: "Good", value: goodDays },
      { name: "Great", value: greatDays }
    ])
  }, [terribleDays, badDays, okDays, goodDays, greatDays])

  const COLORS = ['#EB315F', '#E0932F', '#5937D4', '#31E0EB', '#53E12C'];
  return (
    <div>
      <PieChart width={median([280, width * 0.8, 400])} height={median([280, width * 0.8, 400])}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          outerRadius={80}
          innerRadius={50}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>

  )
}


export default StatisticDounut