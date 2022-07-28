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
                            <div>
                                {user.product_details.map((product, index) => {
                                    return (<ul key={index}>
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
                                        {product.ETAT &&
                                            <li>
                                                <span>ETAT</span>
                                                <span>{product.ETAT}</span>
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
                            <div></div>
                            <div></div>
                            {/* <Link to="/">Home</Link> */}
                        </div>
                    </div>
                </div>)
        }))
}
export default Offer