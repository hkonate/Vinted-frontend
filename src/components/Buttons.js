import { useNavigate } from "react-router-dom"


const Buttons = ({ states }) => {
    const navigate = useNavigate()
    const { fromPublish, setFromPublish, setUser, token } = states
    return <div className="bottom-btns">
        <button
            onClick={() => {
                if (fromPublish) {
                    setFromPublish(false)
                }
                navigate("/SignUp")
            }}
            style={{ display: token === null ? "inline" : 'none' }}>S'incrire</button>
        <button
            className=''
            onClick={() => {
                if (fromPublish) {
                    setFromPublish(false)
                }
                navigate("/Login")

            }}
            style={{ display: token === null ? "inline" : 'none' }}>Se connecter</button>
        <button
            className='btn-disconnect'
            onClick={() => {
                setUser(null)
                setFromPublish(false)
                navigate('/')
            }}
            style={{ display: token !== null ? 'inline' : "none" }}
        >Se déconnecter</button>
    </div>
}
export default Buttons