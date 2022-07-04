
import './App.css';
import { Home } from './Components/Home';
import { Departement } from './Components/Departement';
import { Employee } from './Components/Employee';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className='d-flex justify-content-center m-3'>React JS Frontend</h3>

        <nav className="navbar navbar-dark navbar-expand bg-light">
          <ul className='navbar-nav'>
            <li className='nav-item m-1'>
              <NavLink className="btn btn-light btn-outline-primary" to='/home'>Home</NavLink>
            </li>
            <li className='nav-item m-1'>
              <NavLink className="btn btn-light btn-outline-primary" to='/departement'>Departement</NavLink>
            </li>
            <li className='nav-item m-1'>
              <NavLink className="btn btn-light btn-outline-primary" to='/employee'>Employee</NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/departement' element={<Departement />} />
          <Route path='/employee' element={<Employee />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
