import { Link, useNavigate } from 'react-router-dom'
import banner from '../img/banner.jpg'

const Home = ({ data, currentPage, setCurrentPage, pageNum, setLimit }) => {
    const navigate = useNavigate()

    const handleLimit = event => {
        setLimit(event.target.value)
        if (currentPage >= pageNum) {
            setCurrentPage(pageNum)
        }
    }

    const pageTab = []
    for (let i = 0; i < pageNum; i++) {
        pageTab[i] = i + 1;
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
                <div className='block'>
                    <p>Prêts à faire du tri dans vos placards ?</p>
                    <button style={{ cursor: "pointer" }} onClick={() => { navigate('/publish') }}>Commencer à vendre</button>
                </div>
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
            <div className='pagination-block '>
                {currentPage > 1 && <span onClick={() => {
                    setCurrentPage(currentPage - 1)
                }}>&#60;</span>}

                {pageTab.map((page, index) => {
                    return <span className='each-page' onClick={() => {
                        setCurrentPage(index + 1)
                    }} key={index} style={{ "background-color": currentPage - 1 === index ? "#2cb1ba" : "white", color: currentPage - 1 === index ? "white" : "#2cb1ba" }}>{page}</span>
                })}
                {currentPage < pageNum && <span onClick={() => {
                    setCurrentPage(currentPage + 1)
                }}>&#62;</span>}

            </div>
        </div >
    )
}

export default Home