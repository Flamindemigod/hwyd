import { Button } from '@mui/material';
import React, { useState } from 'react'
import Month from './Month'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Calender = ({session}) => {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const [date, setDate] = useState(new Date());
  return (<div className='w-fit mx-auto'>
    <div className='flex items-center justify-between w-full'>
    <Button onClick={()=>{setDate(new Date(date.getFullYear(), date.getMonth()-1, date.getDate()))}}><ArrowBackIosIcon/></Button>
    <div className='w-32 text-center'>{`${months[date.getMonth()]} ${date.getFullYear()}`}</div>
    <Button onClick={()=>{setDate(new Date(date.getFullYear(), date.getMonth()+1, date.getDate()))}}><ArrowForwardIosIcon/></Button>
    </div>
    <div className='mx-auto w-fit'>
    <Month date={date} session={session}/>
    </div>
    </div>
  )
}

export default Calender