import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { setMood, unsetMood,setActiveDate } from "../features/moodData";
import { supabase } from '../supabaseClient';

const Day = ({ date, firstDay, session }) => {
  const dispatch = useDispatch();
  const moods = useSelector((state) => state.mood.value);
  const [cellColor, setCellColor] = useState("bg-white");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const updateTable = async (session) => {
    if (session) {
      let { error } = await supabase.from('moods').upsert({ id: session.user.id, moods: moods.DateStorage }, {
        returning: 'minimal', // Don't return the value after inserting
      })
      if (error) {
        console.error(error)
      }
    }
  }


  useEffect(() => {
    try{
      switch (moods.DateStorage[date.getFullYear()][date.getMonth()][date.getDate()].mood){
        case "terrible":
          setCellColor("bg-fuschia");
          break;
        case "bad":
          setCellColor("bg-orange");
          break;
        case "ok":
          setCellColor("bg-primary-300");
          break;
        case "good":
          setCellColor("bg-cyan");
          break;
        case "great":
          setCellColor("bg-lightgreen");
          break;
        default:
          setCellColor("bg-white");
      }
    }
    catch{
      setCellColor("bg-white")
    }
    
  }, [moods.DateStorage, date]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(setActiveDate(date))
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ gridColumn: firstDay }} className={`w-10 h-10 sm:w-20 sm:h-20 md:w-32 md:h-32 border-black border-solid border-2 flex justify-center items-center ${cellColor}`} onClick={handleClick}>
        {date.getDate()}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          sx: { display: "flex" },
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          sx={{ paddingInline: "0.5rem", display: "flex", flexDirection: "column", width: "5rem" }}
          onClick={() => {
            handleClose();
            dispatch(unsetMood(date));
            updateTable(session);
          }}>
          <div className='rounded-full w-4 h-4 border-solid border-neutral-600 border-2 bg-white'></div>
          <em>None</em>
        </MenuItem>
        <MenuItem
          sx={{ paddingInline: "0.5rem", display: "flex", flexDirection: "column", width: "5rem" }}
          onClick={() => {
            handleClose();
            dispatch(setMood({ date: date, mood: "terrible" }));
            updateTable(session);
          }}>
          <div className='rounded-full w-4 h-4 border-solid border-neutral-600 border-2 bg-fuschia'></div>
          Terrible
        </MenuItem>
        <MenuItem
          sx={{ paddingInline: "0.5rem", display: "flex", flexDirection: "column", width: "5rem" }}
          onClick={() => {
            handleClose();
            dispatch(setMood({ date: date, mood: "bad" }));
            updateTable(session);
          }}>
          <div className='rounded-full w-4 h-4 border-solid border-neutral-600 border-2 bg-orange'></div>
          Bad
        </MenuItem>
        <MenuItem
          sx={{ paddingInline: "0.5rem", display: "flex", flexDirection: "column", width: "5rem" }}
          onClick={() => {
            handleClose();
            dispatch(setMood({ date: date, mood: "ok" }));
            updateTable(session);
          }}>
          <div className='rounded-full w-4 h-4 border-solid border-neutral-600 border-2 bg-primary-300'></div>
          Ok
        </MenuItem>
        <MenuItem
          sx={{ paddingInline: "0.5rem", display: "flex", flexDirection: "column", width: "5rem" }}
          onClick={() => {
            handleClose();
            dispatch(setMood({ date: date, mood: "good" }));
            updateTable(session);
          }}>
          <div className='rounded-full w-4 h-4 border-solid border-neutral-600 border-2 bg-cyan'></div>
          Good
        </MenuItem>
        <MenuItem
          sx={{ paddingInline: "0.5rem", display: "flex", flexDirection: "column", width: "5rem" }}
          onClick={() => {
            handleClose();
            dispatch(setMood({ date: date, mood: "great" }));
            updateTable(session);
          }}>
          <div className='rounded-full w-4 h-4 border-solid border-neutral-600 border-2 bg-lightgreen'></div>
          Great
        </MenuItem>
      </Menu>
    </>

  )
}

export default Day