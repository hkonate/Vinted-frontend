import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie";
import axios from "axios"
import { useState, useEffect } from "react"
import './App.css';

//PAGE 
import Home from './pages/Home'
import Offer from './pages/Offer'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Publish from './pages/Publish'
// Components
import Header from './components/Header'

library.add(faMagnifyingGlass, faPlus);
function App() {
  const [fromPublish, setFromPublish] = useState(false)
  const [token, setToken] = useState(Cookies.get("userToken") || null)
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [limit, setLimit] = useState(data.count)
  const [currentPage, setCurrentPage] = useState(1)
  const pageNum = Math.floor(data.count / limit)
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
      const response = await axios.get(`https://lereacteur-vinted-api.herokuapp.com/offers?page=${currentPage}&limit=${limit}`);
      setData(response.data);
      setIsLoading(false);
    }
    fetchData()
  }, [currentPage, limit])
  return (isLoading === true ?
    <div>En cours de chargement</div> :
    <Router>
      <div className="container">
        <Header setUser={setUser} token={token} setFromPublish={setFromPublish} fromPublish={fromPublish} />
      </div>
      <Routes>
        <Route path='/' element={<Home data={data} limit={limit} currentPage={currentPage} setCurrentPage={setCurrentPage} pageNum={pageNum} setLimit={setLimit} />} />
        <Route path="/Login" element={<Login setUser={setUser} fromPublish={fromPublish} />}></Route>
        <Route path="/Signup" element={<SignUp setUser={setUser} />} />
        <Route path='/Offer/:productId' element={<Offer />} />
        <Route path='/publish' element={<Publish token={token} setFromPublish={setFromPublish} />}></Route>
      </Routes>
    </Router>)
}

export default App;
