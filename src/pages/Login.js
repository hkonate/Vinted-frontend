import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
const Login = ({ setUser }) => {
    const [errormsg, setErrorMsg] = useState();
    const [userData, setUserData] = useState("", "")
    const navigate = useNavigate()
    const handleConnect = async (event) => {
        try {
            setErrorMsg("")
            event.preventDefault()
            const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/user/login",
                {
                    email: userData[0],
                    password: userData[1]
                });
            if (response.data) {
                setUser(response.data.token)
                navigate('/')
            }
        } catch (error) {
            if (error.response.status === 400) {
                setErrorMsg("Mauvais email et/ou mot de passe")
            }

        }
    }
    return <div className="signup-box login">
        <h2>S'inscrire</h2>
        <form onSubmit={handleConnect}>
            <input type="email" placeholder="Email" onChange={event => {
                const newUserData = [...userData];
                newUserData[0] = event.target.value;
                setUserData(newUserData);
            }} />
            <input type="password" placeholder="Mot de passe" onChange={event => {
                const newUserData = [...userData];
                newUserData[1] = event.target.value;
                setUserData(newUserData);
            }} />

            <button>Se connecter</button>
            {errormsg && <p style={{ color: 'red', "font-size": "12px", "margin-top": "15px" }}>{errormsg}</p>}
            <Link to="/Signup"><p>Pas encore de compte ? Inscris-toi !</p></Link>
        </form>
    </div >
}

export default Login