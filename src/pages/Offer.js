import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
const Offer = () => {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { productId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchOffer = async () => {
            const response = await axios.get(`https://lereacteur-vinted-api.herokuapp.com/offer/${productId}`);
            setData(response.data);
            setIsLoading(false);
        };
        fetchOffer();
    }, [productId])
    return (isLoading ? (<span>En cours de chargement... </span>) :

        <div className='Offer'>
            <div className='offer-box'>
                <div className='left'>
                    <img src={data.product_image.secure_url} alt="product-pic" />
                </div>
                <div className='right'>
                    <div className='product-details'>
                        <p>{data.product_price} €</p>
                        {data.product_details.map((product, index) => {
                            const keys = Object.keys(product)
                            return (
                                <li key={index}>
                                    <span>{keys[0]}</span>
                                    <span>{product[keys[0]]}</span>
                                </li>)
                        })
                        }
                    </div>
                    <div className='line'></div>
                    <div className='offer-descp'>
                        <p>{data.product_name}</p>
                        <p>{data.product_description}</p>
                        {data.owner &&
                            data.owner.account.avatar &&
                            <div className='offer-avatar'>
                                <img src={data.owner.account.avatar.secure_url} alt="avatar" />
                                <p>{data.owner.account.username}</p>
                            </div>}

                    </div>
                    <button onClick={() => {
                        navigate('/payment', { state: { title: data.product_name, price: data.product_price } })
                    }}>Acheter</button>
                </div>

            </div>
        </div>
    )
}
export default Offer