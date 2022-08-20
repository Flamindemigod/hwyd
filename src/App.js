import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Calender from './components/Calender';
import Note from './components/Note';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import { supabase } from "./supabaseClient";
import { Button } from '@mui/material';
import {useState, useEffect} from 'react'
import { getSupabaseData, unsetAll } from './features/moodData';
import Statistics from './components/Statistics';
import Footer from './components/Footer';
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#5836d3",
      }
    },
  });

  const [session, setSession] = useState(null)
  const dispatch = useDispatch();
  const moods = useSelector((state) => state.mood.value);

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(()=>{
    if (session){
      const getUserMoods = async (session) =>{
        let data = await supabase
        .from('moods')
        .select(`moods`)
        .eq('id', session.user.id)
        .single()
        if (data.error && data.status !== 406) {
            console.error(data.error.message)
        }
        if (data.data) {
          dispatch(getSupabaseData(data.data.moods));
        }
    }
    getUserMoods(session);
      
    }
    else{
      dispatch(unsetAll());
    }
  }, [session])

  
  return (
    <ThemeProvider theme={theme}>
      <Header session={session} setSession={setSession}/>
      <Calender session={session}/>
      <Note/>
      <div className='p-8 text-3xl text-center'>How was your day?</div>
      <div className='px-4 text-center'>How was your day is a react based mood tracking web app made by Flamindemigod</div>
      <div className='px-4 text-center'>Sign in with your email or Google to get started.</div>
      <div className='px-4 text-center'>Click on the dates to color the cell based on your mood</div>
      <div className='text-xl text-center p-8'>Statistics</div>

      <Statistics />

      <Footer />
    </ThemeProvider>
  );
}

export default App;
