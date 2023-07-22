import { Routes, Route,} from'react-router-dom'
import './App.css';
import Detail from './views/Details';
import Main from './views/Main'
import Update from './views/Update';
import Notes from './views/Notes';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/api/note" element={<Notes/>} />
        <Route path="/" element={<Main/>} />
        <Route path="/api/note/:id" element={<Detail/>} />
        <Route path="/api/note/:id/edit" element={<Update/>} />
      </Routes>
    </div>
  );
}

export default App;
