import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../img/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";

const Header = () => {
    const navigate = useNavigate()
    return (
        <nav>
            <div className='nav-input'>
                <img src={logo} alt="logo" />
                <div className='research-container'>
                    <FontAwesomeIcon icon="magnifying-glass" />
                    <input type="text" placeholder='Recherche des articles' />
                </div>
            </div>
            <div className='btns'>
                <div className='btn-logs'>
                    <Link to="SignUp"><button style={{ display: Cookies.get("token") ? 'none' : "inline" }}>s'inscrire</button></Link>
                    <button style={{ display: Cookies.get("token") ? 'none' : "inline" }}>Se connecter</button>
                    <button onClick={async () => {
                        await Cookies.remove("token")
                        navigate('/')
                    }} style={{ display: Cookies.get("token") ? 'inline' : "none" }} className='btn-disconnect'>Se déconnecter</button>
                </div>
                <div className='btn-sell'>
                    <button>Vends tes articles</button>
                </div>
            </div>
        </nav>
    )
}
export default Header