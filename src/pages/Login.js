import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
const Login = ({ states }) => {
    const { setUser, fromPublish, setUsername, setHide, setHideBtns } = states
    const [errormsg, setErrorMsg] = useState();
    const [userData, setUserData] = useState("", "")
    useEffect(() => {
        setHideBtns([false, true, false])
        setHide(true)
    })
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
                setUsername(response.data.name);
                setUser(response.data.token)
                if (fromPublish) {
                    navigate('/publish')
                } else {
                    navigate('/')
                }

            }
        } catch (error) {
            if (error.response.status === 400) {
                setErrorMsg("Mauvais email et/ou mot de passe")
            }

        }
    }

    const inputs = [{ type: "email", placeholder: "Email" }, { type: "password", placeholder: "Mot de passe" }]

    return <div className="signup-box login">
        <h2>S'inscrire</h2>
        <form onSubmit={handleConnect}>
            {
                inputs.map((obj, index) => {
                    return <input type={obj.type} placeholder={obj.placeholder} onChange={event => {
                        const newUserData = [...userData];
                        newUserData[index] = event.target.value;
                        setUserData(newUserData);
                    }} />
                })
            }
            <button>Se connecter</button>
            {errormsg && <p style={{ color: 'red', "font-size": "12px", "margin-top": "15px" }}>{errormsg}</p>}
            <Link to="/Signup"><p>Pas encore de compte ? Inscris-toi !</p></Link>
        </form>
    </div >
}

export default Login