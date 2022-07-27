import { Link } from 'react-router-dom'
import banner from '../img/banner.jpg'

const Home = ({ data, setData }) => {
    return (
        <div className='Home'>
            <div className='banner'>
                <img src={banner} alt="banner" />
                <div className='block'>
                    <p>Prêts à faire du tri dans vos placards ?</p>
                    <button>Commencer à vendre</button>
                </div>
            </div>
            <Link to='/Offer'>Offer pages</Link>

        </div >
    )
}

export default Home