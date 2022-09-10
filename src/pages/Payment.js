import { Navigate, useLocation } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from 'axios'
import { useState } from 'react'
const Payment = ({ username, token }) => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation()
    const { title, price } = location.state;
    const [completed, setCompleted] = useState(false)

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            const cardElement = elements.getElement(CardElement);

            const stripeResponse = await stripe.createToken(cardElement, {
                name: `${username}`,
            });
            const stripeToken = stripeResponse.token.id;

            const response = await axios.post(" https://lereacteur-vinted-api.herokuapp.com/payment", {
                token: stripeToken,
                title,
                amount: price

            });
            console.log(response.data);
            if (response.data.status === "succeeded") {
                setCompleted(true);
            }
        } catch (error) {
            console.log(error.response.data);
        }

    };

    const orderInfos = [{ name: "Commande", price: price }, { name: "Frais protection acheteurs", price: "1.00 €" }, { name: "Frais de port", price: "2.00 €" }]

    return (
        token ?
            (<div className="payment">
                <div className="pay-container">
                    <div className="details-cmd">
                        <h4>Résumé de la commande</h4>
                        {
                            orderInfos.map(obj => {
                                return <div>
                                    <span>{obj.name}</span>
                                    <span>{obj.price}</span>
                                </div>
                            })
                        }
                        {/* <div>
                            <span>Commande</span>
                            <span>{price} €</span>
                        </div>
                        <div>
                            <span>Frais protection acheteurs</span>
                            <span>1.00 €</span>
                        </div>
                        <div>
                            <span>Frais de port</span>
                            <span>2.00 €</span>
                        </div> */}
                    </div>
                    <div className="split-pay"></div>
                    <div className="recap-total">
                        <div>
                            <span>Total</span>
                            <span>{price + 1 + 2} €</span>
                        </div>

                        <p>Il ne vous reste plus qu'un étape pour vous offrir <span>{title}</span> 😍. Vous allez payer <span>{price + 1 + 2} €</span> (frais de protection et frais de port inclus).</p>
                    </div>
                    {completed ? <p className="purchase-done">Merci pour votre achat.</p> : <form onSubmit={handleSubmit}>
                        <div><CardElement /></div>

                        <button type="submit">Pay</button>
                    </form>}

                </div>

            </div>) : (<Navigate to='/login' />))
}
export default Payment