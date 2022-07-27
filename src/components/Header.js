import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../img/logo.jpg'

const Header = () => {
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
                    <button>s'inscrire</button>
                    <button>Se connecter</button>
                </div>
                <div className='btn-sell'>
                    <button>Vends tes articles</button>
                </div>
            </div>
        </nav>
    )
}
export default Header