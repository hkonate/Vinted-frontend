import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../img/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Slider from './Slider';
import { useEffect } from 'react';

const Header = ({ states }) => {
    const { setUser, token, setFromPublish, fromPublish, setSort, sort, setHide, hide, setHideBtns, hideBtns } = states
    const navigate = useNavigate()
    useEffect(() => {
        setHide(false)
        setHideBtns([false, false, false])
    })
    return (
        <nav>
            <div className='nav-input'>
                <img
                    style={{ marginBottom: hide && "30px" }}
                    onClick={() => {
                        navigate('/')
                    }} src={logo} alt="logo" />

                {!hide && <div style={{ width: "100%" }} >
                    <div className='research-container'>
                        <FontAwesomeIcon icon="magnifying-glass" />
                        <input type="text" placeholder='Recherche des articles' />
                    </div>
                    <div className="nav-filter">
                        <span>Trier par prix : </span>
                        <div
                            onClick={() => {
                                if (sort === "price-asc") {
                                    setSort("price-desc")
                                } else {
                                    setSort("price-asc")
                                }
                            }}
                            className='nav-desc-asc'>
                            <div style={{ right: sort === "price-asc" ? "0px" : "-24px" }}>
                                {
                                    sort === "price-asc" ? <span>⇡</span> : <span>⇣</span>
                                }
                            </div>
                        </div>
                        <Slider states={states} />
                    </div>
                </div>}
            </div>
            <div className='btns' style={{ marginTop: hide && "30px" }}>
                <div className='btn-logs'>
                    {!hideBtns[0] && <Link onClick={() => {
                        if (fromPublish) {
                            setFromPublish(false)
                        }
                    }}
                        to="SignUp"><button style={{ display: token === null ? "inline" : 'none' }}>s'inscrire</button></Link>}
                    {!hideBtns[1] && <Link onClick={() => {
                        if (fromPublish) {
                            setFromPublish(false)
                        }
                    }} to="Login"><button style={{ display: token === null ? "inline" : 'none' }}>Se connecter</button></Link>}
                    <button onClick={() => {
                        setUser(null)
                        setFromPublish(false)
                        navigate('/')
                    }} style={{ display: token !== null ? 'inline' : "none" }} className='btn-disconnect'>Se déconnecter</button>
                </div>
                {!hideBtns[2] && <div className='btn-sell'>
                    <Link onClick={() => {
                        if (token === null) {
                            setFromPublish(true)
                        }
                    }}
                        to='/publish'><button>Vends tes articles</button></Link>
                </div>}
            </div>
        </nav>
    )
}
export default Header