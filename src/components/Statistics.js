import { DatePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'
import StatisticDounut from './StatisticDounut'
import { TextField } from '@mui/material'
import {  East } from '@mui/icons-material'
const Statistics = () => {
  const [upperDate, setUpperDate] = useState(new Date())
  const [lowerDate, setLowerDate] = useState(new Date(new Date().getFullYear()-1, new Date().getMonth(), new Date().getDate()+1))
  return (
    <>
      <div className='flex gap-4 p-4 items-center'>
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
      <StatisticDounut upperBound={upperDate} lowerBound={lowerDate}></StatisticDounut>
    </>
  )
}

export default Statistics