import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios"
import { useState, useEffect } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie";

import './App.css';

//PAGE 
import Home from './pages/Home'
import Offer from './pages/Offer'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
// Components
import Header from './components/Header'

library.add(faMagnifyingGlass);
function App() {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState(Cookies.get("userToken") || null)

  const setUser = (token) => {
    if (token !== null) {
      Cookies.set("userToken", token)
    } else {
      Cookies.remove('userToken')
    }
    setToken(token)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://lereacteur-vinted-api.herokuapp.com/offers");
      setData(response.data);
      setIsLoading(false);
    }
    fetchData()
  }, [])

  return (isLoading ?
    (<span>En cours de chargement... </span>) :
    (<Router>
      <div className="container">
        <Header setUser={setUser} token={token} />
      </div>
      <Routes>
        <Route path='/' element={<Home data={data} />} />
        <Route path="/login" element={<Login setUser={setUser} />}></Route>
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path='/Offer/:productId' element={<Offer />} />
      </Routes>
    </Router>))
}

export default App;
