import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
    const [userData, setUserData] = useState(["", "", "", false])
    const navigate = useNavigate()
    return <div className="signup-box">
        <h2>S'inscrire</h2>
        <form onSubmit={async (event) => {
            event.preventDefault();
            const dataUser = {
                "email": userData[0],
                "username": userData[1],
                "password": userData[2],
                "newsletter": userData[3]
            }
            const response = await axios.post('https://lereacteur-vinted-api.herokuapp.com/user/signup', dataUser);
            var inMin = new Date(new Date().getTime() + 1 * 60 * 1000);
            await Cookies.set('token', response.data.token, { expires: inMin })
            navigate('/');
        }}>
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
                <input onClick={() => {
                    const newUserData = [...userData];
                    newUserData[3] = newUserData[3] === false ? true : false;
                    setUserData(newUserData)
                }} type="checkbox" />
                <span>S'inscrire à notre newsletter</span>
            </div>
            <p>En m'inscrivant je confirme avoir lu et accepté les Termes & Conditions et Politique de Confidentialité de Vinted. Je confirme avoir au moins 18 ans.</p>
            <button>S'inscrire</button>
        </form>
    </div >
}
export default SignUp