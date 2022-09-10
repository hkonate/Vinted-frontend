import axios from 'axios'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom'

const Publish = ({ token, setFromPublish }) => {
    const [picture, setPicture] = useState(null)
    const navigate = useNavigate()
    const [newPublish, setNewPublish] = useState([null, null, null, null, null, null, null, null, false])
    const [picDisplay, setPicDisplay] = useState(null)
    const [revoke, setRevoke] = useState(true)

    // const inputTitle = [
    //     { name: "Title", placeholder: 'ex: Chemise Sézane verte' },
    //     { name: "Décris ton article", placeholder: "ex: porté quelquefois, taille correctement" },
    //     { name: "Marque", placeholder: "ex: Zara" },
    //     { name: "Taille", placeholder: "ex: L/ 40 / 12" },
    //     { name: "Couleur", placeholder: "ex: Fushia" },
    //     { name: "Etat", placeholder: "'Neuf avec étiquette" },
    //     { name: "Lieu", placeholder: "ex: Paris" }]
    const handleRedirection = () => {
        navigate('/login');
        setFromPublish(true);
    }
    const handleNewArticleToSell = async event => {
        try {
            event.preventDefault()

            const formData = new FormData();
            formData.append("title", newPublish[0])
            formData.append("description", newPublish[1])
            formData.append("price", newPublish[7])
            formData.append("condition", newPublish[5])
            formData.append("city", newPublish[6])
            formData.append("brand", newPublish[3])
            formData.append("size", newPublish[4])
            formData.append("color", newPublish[2])
            formData.append("picture", picture)

            const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/offer/publish", formData,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                        "content-type": "multipart/form-data"
                    }
                })
            console.log(response.data)
            if (response.data._id) {
                navigate(`/Offer/${response.data._id}`)
            }

        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        token !== null ? (
            <div className="Publish">
                <div className="container">
                    <h2>Vends ton article</h2>
                    <form onSubmit={handleNewArticleToSell}>
                        <div>
                            <div className="doted-box">
                                {revoke ?
                                    <label htmlFor="addpicture">
                                        <FontAwesomeIcon icon="plus" />
                                        <input onChange={(event) => {
                                            setPicture(event.target.files[0])
                                            setPicDisplay(URL.createObjectURL(event.target.files[0]));
                                            setRevoke(false)
                                        }} id="addpicture" type="file" placeholder='Ajouter une photo' />
                                        <span>Ajoute une photo</span>
                                    </label> : <div>
                                        <img src={picDisplay} alt="pic" /*style={{ width: "165px", height: "90%" }}*/ />
                                        <div style={{ cursor: "pointer" }} onClick={() => {
                                            setRevoke(true)
                                        }} className='preview'>X</div>
                                    </div>}

                            </div>
                        </div>
                        <div>
                            {/* {
                                inputTitle.map((obj, index) => {
                                    <div className='space'>
                                <span>{obj.name}</span>
                                {
                                    obj.name === "Décris ton article" ?
                                    <textarea onChange={event => {
                                        const newTab = [...newPublish]
                                        newTab[index] = event.target.value;
                                        setNewPublish(newTab)
                                    }} name="descrip" rows="5" placeholder={obj.placeholder}></textarea>
                                    :
                                    <input onChange={event => {
                                        const newTab = [...newPublish]
                                        newTab[index] = event.target.value;
                                        setNewPublish(newTab)
                                    }} type="text" placeholder={obj.placeholder} />
                                }
                                <input onChange={event => {
                                    const newTab = [...newPublish]
                                    newTab[0] = event.target.value;
                                    setNewPublish(newTab)
                                }} type="text" placeholder='ex: Chemise Sézane verte' />
                            </div>
                                })
                            } */}
                            <div className='space'>
                                <span>Titre</span>
                                <input onChange={event => {
                                    const newTab = [...newPublish]
                                    newTab[0] = event.target.value;
                                    setNewPublish(newTab)
                                }} type="text" placeholder='ex: Chemise Sézane verte' />
                            </div>
                            <div className='space textarea'>
                                <span>Décris ton article</span>
                                <textarea onChange={event => {
                                    const newTab = [...newPublish]
                                    newTab[1] = event.target.value;
                                    setNewPublish(newTab)
                                }} name="descrip" rows="5" placeholder='ex: porté quelquefois, taille correctement'></textarea>
                            </div>
                        </div>
                        <div>
                            <div className='space'>
                                <span>Marque</span>
                                <input onChange={event => {
                                    const newTab = [...newPublish]
                                    newTab[2] = event.target.value;
                                    setNewPublish(newTab)
                                }} type="text" placeholder='ex: Zara' />
                            </div>
                            <div className='space'>
                                <span>Taille</span>
                                <input onChange={event => {
                                    const newTab = [...newPublish]
                                    newTab[3] = event.target.value;
                                    setNewPublish(newTab)
                                }} type="text" placeholder='ex: L/ 40 / 12' />
                            </div>
                            <div className='space'>
                                <span>Couleur</span>
                                <input onChange={event => {
                                    const newTab = [...newPublish]
                                    newTab[4] = event.target.value;
                                    setNewPublish(newTab)
                                }} type="text" placeholder='ex: Fushia' />
                            </div>
                            <div className='space'>
                                <span>Etat</span>
                                <input onChange={event => {
                                    const newTab = [...newPublish]
                                    newTab[5] = event.target.value;
                                    setNewPublish(newTab)
                                }} type="text" placeholder='Neuf avec étiquette' />
                            </div>
                            <div className='space'>
                                <span>Lieu</span>
                                <input onChange={event => {
                                    const newTab = [...newPublish]
                                    newTab[6] = event.target.value;
                                    setNewPublish(newTab)
                                }} type="text" placeholder='ex: Paris' />
                            </div>
                        </div>
                        <div>
                            <div className='space exchange'>
                                <span>Prix</span>
                                <div className='exchange-price'>
                                    <input onChange={event => {
                                        const newTab = [...newPublish]
                                        newTab[7] = event.target.value;
                                        setNewPublish(newTab)
                                    }} type="text" placeholder='0,00 €' />
                                    <div className='space'>
                                        <input onChange={event => {
                                            const newTab = [...newPublish]
                                            newTab[8] = event.target.checked;
                                            setNewPublish(newTab)
                                        }} className='check-publish' type="checkbox" />
                                        <span>Je suis intéressé(e) par les échanges</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='publish-btn'>
                            <button type="submit">Ajouter</button>
                        </div>
                    </form>
                </div >
            </div >) : handleRedirection())
}

export default Publish