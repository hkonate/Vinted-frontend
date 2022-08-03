import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie";
import axios from "axios"
import { useState, useEffect } from "react"
import './App.css';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

//PAGE 
import Home from './pages/Home'
import Offer from './pages/Offer'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Publish from './pages/Publish'
import Payment from "./pages/Payment";
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
  const [userId, setUserId] = useState(null)

  const pageNum = Math.floor(data.count / limit)
  const stripePromise = loadStripe("pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP");

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
        <Route path="/Login" element={<Login setUser={setUser} fromPublish={fromPublish} setUserId={setUserId} />}></Route>
        <Route path="/Signup" element={<SignUp setUser={setUser} />} />
        <Route path='/Offer/:productId' element={<Offer />} />
        <Route path='/publish' element={<Publish token={token} setFromPublish={setFromPublish} />}></Route>

        <Route path='/payment' element={<Elements stripe={stripePromise}>
          <Payment userId />
        </Elements>}></Route>
      </Routes>
    </Router>)
}

export default App;
