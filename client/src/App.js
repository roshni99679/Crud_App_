
import './App.css';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import {Routes,Route} from 'react-router-dom'

import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" exact element={<Home />}/>
      <Route path="/register" exact element={<Register />}/>
      <Route path="/edit/:id" exact element={<Edit />}/>
      <Route path="/view/:id" exact element={<Details />}/>
    </Routes>
    </>
  );
}

export default App;
