import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import About from './About';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </div>
  );
}

export default App;
