
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Locations from './pages/Locations';
import Users from './pages/Users';
import Register from './pages/Register';

import { Fragment } from 'react';

function App() {
  return (
    <Fragment>    
    <Routes>
      <Route path="/" element={<Register />}/>
      <Route path="/locations" element={<Locations />}/>
      <Route path="/users" element={<Users />}/>
    </Routes>
    </Fragment>
  );
}

export default App;
