import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios"
import { useState, useEffect } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import './App.css';

//PAGE 
import Home from './pages/Home'
import Offer from './pages/Offer'

// Components
import Header from './components/Header'

library.add(faMagnifyingGlass);
function App() {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://lereacteur-vinted-api.herokuapp.com/offers");
      setData(response.data);
      setIsLoading(false);
    }
    fetchData()
  }, [data])
  return (isLoading ?
    (<span>En cours de chargement... </span>) :
    (<Router>
      <div className="container">
        <Header />
      </div>
      <Routes>
        <Route path='/' element={<Home data={data} setData={setData} />} />
        <Route path='/Offer/:productId' element={<Offer />} />
      </Routes>
    </Router>))
}

export default App;
