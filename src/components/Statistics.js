import React, { useState } from 'react'
import StatisticDounut from './StatisticDounut'

const Statistics = () => {
  const [upperDate, setUpperDate] = useState(new Date())
  const [lowerDate, setLowerDate] = useState(new Date(2021,0,1))
  return (
    <>
    <StatisticDounut upperBound={upperDate} lowerBound={lowerDate}></StatisticDounut>
    </>
  )
}

export default Statistics