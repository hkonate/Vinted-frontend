import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
const SignUp = ({ states }) => {
    const { setUser, setUsername, setHide, setHideBtns } = states
    useEffect(() => {
        setHideBtns([true, false, false])
        setHide(true)
    })
    const [userData, setUserData] = useState(["", "", "", false])
    const [errormgs, setErrorMsg] = useState()
    const navigate = useNavigate()
    const inputs = [{ type: "text", placeholder: "Nom d'utilisateur" }, { type: "email", placeholder: "Email" }, { type: "password", placeholder: "Mot de passe" }]

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
                setUsername(userData[1])
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
            {
                inputs.map((obj, index) => {
                    return <input type={obj.type} placeholder={obj.placeholder} onChange={event => {
                        const newUserData = [...userData];
                        newUserData[index] = event.target.value;
                        setUserData(newUserData);
                    }} />
                })
            }
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