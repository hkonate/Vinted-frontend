import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const SignUp = ({ setUser }) => {
    const [userData, setUserData] = useState(["", "", "", false])
    const [errormgs, setErrorMsg] = useState()
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        try {
            setErrorMsg('')

            event.preventDefault();

            const response = await axios.post('https://lereacteur-vinted-api.herokuapp.com/user/signup',
                {
                    "email": userData[0],
                    "username": userData[1],
                    "password": userData[2],
                    "newsletter": userData[3]
                })
            if (response.data) {
                setUser(response.data.token)
                navigate('/')
            }

        } catch (error) {
            if (error.response.status === 409) {
                setErrorMsg('Cet email a déja un compte !')
            }
        }

    }

    return <div className="signup-box">
        <h2>S'inscrire</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nom d'utilisateur" onChange={event => {
                const newUserData = [...userData];
                newUserData[0] = event.target.value;
                setUserData(newUserData);
            }} />
            <input type="email" placeholder="Email" onChange={event => {
                const newUserData = [...userData];
                newUserData[1] = event.target.value;
                setUserData(newUserData);
            }} />
            <input type="password" placeholder="Mot de passe" onChange={event => {
                const newUserData = [...userData];
                newUserData[2] = event.target.value;
                setUserData(newUserData);
            }} />
            <div className="checkbox">
                <input onClick={event => {
                    const newUserData = [...userData];
                    newUserData[3] = event.target.checked;
                    setUserData(newUserData)
                }} type="checkbox" />
                <span>S'inscrire à notre newsletter</span>
            </div>
            <p className="terms">En m'inscrivant je confirme avoir lu et accepté les Termes & Conditions et Politique de Confidentialité de Vinted. Je confirme avoir au moins 18 ans.</p>
            <button>S'inscrire</button>
            {errormgs && <p style={{ color: 'red' }}>{errormgs}</p>}
            <Link to="/Login"><p>Tu as déjà un compte ? Connecte-toi !</p></Link>
        </form>
    </div >
}
export default SignUp