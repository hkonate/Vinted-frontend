import { Link, useParams } from 'react-router-dom'

const Offer = ({ data, setData }) => {
    const { productId } = useParams()
    return (
        data.offers.map((user, index) => {
            return (
                user._id === productId &&
                <div className='Offer'>
                    <div className='offer-box'>
                        <div className='left'>
                            <img key={index} src={user.product_image.secure_url} alt="product-pic" />
                        </div>
                        <div className='right'>
                            <div className='product-details'>
                                <p>{user.product_price} €</p>
                                {user.product_details.map((product, index) => {
                                    return (
                                        <ul key={index}>
                                            {product.MARQUE &&
                                                <li>
                                                    <span>Marque</span>
                                                    <span>{product.MARQUE}</span>
                                                </li>
                                            }

                                            {product.TAILLE &&
                                                <li>
                                                    <span>TAILLE</span>
                                                    <span>{product.TAILLE}</span>
                                                </li>
                                            }
                                            {product.ÉTAT &&
                                                <li>
                                                    <span>ETAT</span>
                                                    <span>{product.ÉTAT}</span>
                                                </li>
                                            }
                                            {product.COULEUR &&
                                                <li>
                                                    <span>COULEUR</span>
                                                    <span>{product.COULEUR}</span>
                                                </li>
                                            }
                                            {product.EMPLACEMENT &&
                                                <li>
                                                    <span>EMPLACEMENT</span>
                                                    <span>{product.EMPLACEMENT}</span>
                                                </li>
                                            }
                                        </ul>)
                                })
                                }
                            </div>
                            <div className='line'></div>
                            <div className='offer-descp'>
                                {user.product_name && <p>{user.product_name}</p>}
                                {user.product_description && <p>{user.product_description}</p>}
                                {user.owner &&
                                    <div className='offer-avatar'>
                                        <img src={user.owner.account.avatar.secure_url} alt="" />
                                        <p>{user.owner.account.username}</p>
                                    </div>}

                            </div>

                            {/* <Link to="/">Home</Link> */}
                            <button>Acheter</button>
                        </div>

                    </div>

                </div>)
        }))
}
export default Offer