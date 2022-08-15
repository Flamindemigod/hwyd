import './App.css';
import { setMood, unsetMood } from './features/moodData';
import { useDispatch, useSelector } from 'react-redux';
function App() {
  const dispatch = useDispatch();
  const moods = useSelector((state) => state.mood.value);
  return (
    <>
    </>
  );
}

export default App;
