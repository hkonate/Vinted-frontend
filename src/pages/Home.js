import { Link, useNavigate } from 'react-router-dom'
import banner from '../img/banner.jpg'
import Pagination from '../components/Pagination'
import Buttons from '../components/Buttons';

const Home = ({ states }) => {
    const { data, currentPage, setCurrentPage, pageNum, setLimit } = states
    const navigate = useNavigate()
    const handleLimit = event => {
        setLimit(event.target.value)
        if (currentPage >= pageNum) {
            setCurrentPage(pageNum)
        }
    }



    return (
        < div className='Home'>
            <select id="limit-select">
                <option onClick={handleLimit} value="">Offre par pages</option>
                <option onClick={handleLimit} value="4">4</option>
                <option onClick={handleLimit} value="8">8</option>
                <option onClick={handleLimit} value="12">12</option>
                <option onClick={handleLimit} value="16">16</option>
            </select>
            <div className='banner'>
                <img src={banner} alt="banner" />
            </div>
            <div className='block'>
                <p>Prêts à faire du tri dans vos placards ?</p>
                <button style={{ cursor: "pointer" }} onClick={() => { navigate('/publish') }}>Commencer à vendre</button>
            </div>
            <div className='users-container container'>
                {data.offers.map((user, index) => {
                    return (
                        <div key={index} className='user-box'>
                            {user.owner && (
                                user.owner.account.avatar &&
                                <div className='avatar-box'>
                                    <img src={user.owner.account.avatar.secure_url} alt="avatar" />
                                    <p>{user.owner.account.username}</p>
                                </div>)}
                            <div className='product-pic' style={{ marginTop: (!user.owner && "25px") || (!user.owner.account.avatar && '25px') }}>
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
            <Buttons states={states} />
            <Pagination currentPage={currentPage} pageNum={pageNum} setCurrentPage={setCurrentPage} />
        </div >
    )
}

export default Home