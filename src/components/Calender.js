import { Button } from '@mui/material';
import React, { useState } from 'react'
import Month from './Month'
import { Menu, MenuItem } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Calender = ({ session }) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [date, setDate] = useState(new Date());

  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (<div className='w-fit mx-auto mt-8'>
    <div className='flex items-center justify-between w-full'>
      <Button onClick={() => { setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())) }}><ArrowBackIosIcon /></Button>
      <div className='w-full text-center text-xl' 
        aria-controls={menuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : undefined} 
        onClick={handleClick}>{`${months[date.getMonth()]} ${date.getFullYear()}`}</div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{vertical: "top", horizontal: "center"}}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          
        }}
      > <MenuItem className=''>
      <div className="flex justify-between w-full items-center">
        <Button onClick={()=>{setDate(new Date(date.getFullYear()-1, date.getMonth(), date.getDate()))}}><ArrowBackIosIcon /></Button>
          {date.getFullYear()}
          <Button onClick={()=>{setDate(new Date(date.getFullYear()+1, date.getMonth(), date.getDate()))}}><ArrowForwardIosIcon /></Button>
      </div>
      </MenuItem>
        <div className="grid grid-cols-3">
        {months.map((month, index)=>(<MenuItem onClick={()=>{setDate(new Date(date.getFullYear(), index, date.getDate())); handleClose();}}>{month}</MenuItem>))}
        </div>
      </Menu>
      <Button onClick={() => { setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())) }}><ArrowForwardIosIcon /></Button>
    </div>
    <div className='mx-auto w-fit'>
      <Month date={date} session={session} />
    </div>
  </div>
  )
}

export default Calender