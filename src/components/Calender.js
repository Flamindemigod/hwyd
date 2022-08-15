import { Button } from '@mui/material';
import React from 'react'
import Month from './Month'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Calender = () => {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let date = new Date();
  return (<>
    <div className='flex items-center justify-center'>
    <Button><ArrowBackIosIcon/></Button>
    <div>{`${months[date.getMonth()]} ${date.getFullYear()}`}</div>
    <Button><ArrowForwardIosIcon/></Button>
    </div>
    <div className='mx-auto w-fit'>
    <Month date={date}/>
    </div>
    </>
  )
}

export default Calender