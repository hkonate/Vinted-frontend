import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../img/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'


const Header = ({ setUser, token }) => {
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
                    <Link to="SignUp"><button style={{ display: token === null ? "inline" : 'none' }}>s'inscrire</button></Link>
                    <Link to="Login"><button style={{ display: token === null ? "inline" : 'none' }}>Se connecter</button></Link>
                    <button onClick={() => {
                        setUser(null)
                        navigate('/')
                    }} style={{ display: token !== null ? 'inline' : "none" }} className='btn-disconnect'>Se déconnecter</button>
                </div>
                <div className='btn-sell'>
                    <button>Vends tes articles</button>
                </div>
            </div>
        </nav>
    )
}
export default Header