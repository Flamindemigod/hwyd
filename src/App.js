import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Year from './components/Year';
function App() {
  const dispatch = useDispatch();
  const moods = useSelector((state) => state.mood.value);
  return (
    <>

    <Year />
    {JSON.stringify(moods)}
    </>
  );
}

export default App;
