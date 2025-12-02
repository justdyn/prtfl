import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Contact from './pages/contact';
import Works from './pages/works';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
