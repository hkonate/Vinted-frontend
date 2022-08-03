import { useLocation } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from 'axios'
import { useState } from 'react'
const Payment = ({ userId }) => {
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
                name: `${userId}`,
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

    return <div className="payment">
        <div className="pay-container">
            <div className="details-cmd">
                <h4>Résumé de la commande</h4>
                <div>
                    <span>Commande</span>
                    <span>{price} €</span>
                </div>
                <div>
                    <span>Frais protection acheteurs</span>
                    <span>1.00 €</span>
                </div>
                <div>
                    <span>Frais de port </span>
                    <span>2.00 €</span>
                </div>
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

    </div>
}
export default Payment