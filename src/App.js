import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Calender from './components/Calender';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#5836d3",
      }
    },
  });
  const dispatch = useDispatch();
  const moods = useSelector((state) => state.mood.value);
  return (
    <ThemeProvider theme={theme}>
      <Calender />
      {JSON.stringify(moods)}
    </ThemeProvider>
  );
}

export default App;
