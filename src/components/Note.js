import { Button, FormControl, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNote } from '../features/moodData';
const Note = () => {
    const data = useSelector((state) => state.mood.value);
    const dispatch = useDispatch();
    const [note, SetNote] = useState("");

    useEffect(()=>{
        if (data.DateStorage[data.activeDate]){
            SetNote(data.DateStorage[data.activeDate].note)
        }
        else{
            SetNote("")
        }
    }, [data.activeDate])
  return (
    <>
    <FormControl fullWidth sx={{padding:"1rem"}}>
        <div className="flex w-full p-4 gap-4">
            <TextField className='w-full' multiline label={`Note for ${new Date(data.activeDate).toDateString()}`} value={note} onChange={(e)=>{SetNote(e.target.value)}}></TextField>
            <Button className='w-32' variant='contained' onClick={()=>{dispatch(setNote({date: new Date(data.activeDate), note:note}))}}>Save Note</Button>
        </div>
    </FormControl>
    
    </>
  )
}

export default Note