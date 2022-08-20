import { DatePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'
import StatisticDounut from './StatisticDounut'
import { TextField } from '@mui/material'
import {  East } from '@mui/icons-material'
import StatisticStackedBar from './StatisticStackedBar'
const Statistics = () => {
  const [upperDate, setUpperDate] = useState(new Date())
  const [lowerDate, setLowerDate] = useState(new Date(new Date().getFullYear()-1, new Date().getMonth(), new Date().getDate()+1))
  return (
    <>
      <div className='flex gap-4 p-4 items-center justify-center'>
        <DatePicker
          disableFuture
          id="lowerDate"
          label="Start date"
          inputFormat="dd/MM/yyyy"
          value={lowerDate}
          onChange={(date) => { setLowerDate(date) }}
          renderInput={(params) => (
            <TextField {...params} helperText={params?.inputProps?.placeholder} />
          )}
        />
        <East fontSize='large' color='primary'/>
        <DatePicker
          disableFuture
          id="upperDate"
          label="End date"
          inputFormat="dd/MM/yyyy"
          value={upperDate}
          onChange={(date) => { setUpperDate(date) }}
          renderInput={(params) => (
            <TextField {...params} helperText={params?.inputProps?.placeholder} />
          )}
        />
      </div>
      <div className='flex items-center justify-center flex-col sm:flex-row'>
      <div className="flex flex-col items-center justify-center">
        <StatisticDounut upperBound={upperDate} lowerBound={lowerDate} />
        <div className="text-sm">Accumalted moods from {lowerDate.toDateString()} to {upperDate.toDateString()}</div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <StatisticStackedBar upperBound={upperDate} lowerBound={lowerDate} />
        <div className="text-sm">Frequency of moods for each day of the week</div>
      </div>
      </div>

    </>
  )
}

export default Statistics