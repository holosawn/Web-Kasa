import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import MenuPage from './pages/MenuPage';

function App() {
  return (
    <Routes>
      <Route path='/Login' element={<LoginPage/>} />
      <Route path='/Menu' element={<MenuPage/>} />
    </Routes>
  );
}

export default App;
