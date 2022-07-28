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
            <div className='users-container container'>
                {data.offers.map((user, index) => {
                    console.log(user)
                    return (

                        <div key={index} className='user-box'>
                            {user.owner &&
                                <div className='avatar-box'>
                                    <img src={user.owner.account.avatar.secure_url} alt="avatar" />
                                    <p>{user.owner.account.username}</p>
                                </div>}
                            <div className='product-pic' style={{ "margin-top": !user.owner && "25px" }}>
                                <Link to={`Offer/${user._id}`}>
                                    <img src={user.product_image.secure_url} alt="product-pic" />
                                </Link>
                            </div>
                            <div className='product-infos'>
                                <span> {user.product_price} €</span>
                                <span>{user.product_details[1].TAILLE}</span>
                                <span>{user.product_details[0].MARQUE}</span>
                            </div>
                        </div>

                    )
                })}
            </div>
        </div >
    )
}

export default Home