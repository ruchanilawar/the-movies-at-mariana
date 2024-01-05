import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/Home/Home';
import data from './data/movieList.json';

function App() {
  return (
    <div className="App">
      
      <Router>
      <Header/>
        <Routes>
          <Route index element={<Home data={data}/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
