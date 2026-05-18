import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import NavbarComponent from './components/Navbar';
import AllBook from './pages/AllBook';
import UnReadBook from './pages/UnReadBook';
import ReadingBook from './pages/ReadingBook';
import Detail from './pages/Detail';


function App() {


  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<ReadingBook />} />
        <Route path='/huyse123123/AllBook' element={<AllBook />} />
        <Route path='/huyse123123/UnReadbooks' element={<UnReadBook />} />
        <Route path='/bookDetail/:id' element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
