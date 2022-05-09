import './App.css';
import Section from "./components/Section";
import welcomeImage from "./images/welcome-image.png"
import {useState, useRef} from "react";
import {Modal} from '@mui/material';

export default function App() {

    const password = process.env.REACT_APP_PASSWORD

    const homeSection = <div id={"section-0"} className={"section"}>
        <img id={"welcome-image"} src={welcomeImage} alt={"Welcome"}/>
    </div>

    const [modalVisible, setModalVisible] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const tempInfo = useRef({})
    const [section, setSection] = useState(homeSection)

    const generateSection = (id, label, path) => <Section id={id} label={label} folderPath={path}/>

    const generateNavItem = (id, index, label, path) =>
        <div id={`${id}-navigation-item-${index}`} key={`${id}-navigation-item-${index}`} className={"navigation-item"}
             onClick={event => {
                 event.preventDefault()
                 setSection(generateSection(id, label, path))
             }}> {label}
        </div>

    const generateNavItemWithLock = (id, index, label, path) =>
        <div id={`${id}-navigation-item-${index}`} key={`${id}-navigation-item-${index}`} className={"navigation-item"}
             onClick={event => {
                 event.preventDefault()
                 tempInfo.current = {id: id, label: label, path: path}
                 setModalVisible(true)
             }}> {label} <i className="fa fa-lock"/>
        </div>

    const handleSubmit = event => {
        event.preventDefault()
        if (password !== event.target[0].value) {
            event.target.reset()
        } else {
            setSection(generateSection(tempInfo.current.id, tempInfo.current.label, tempInfo.current.path))
            setModalVisible(false)
        }
    }

    return (
        <div className="App">
            <Modal id={"modal"} open={modalVisible}>
                <div id={"modal-content"}>
                    <form className={"modal-form"} onSubmit={event => handleSubmit(event)}>
                        <label>This section is locked, please enter the password.</label>
                        <i className={showPass ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true" onClick={() => setShowPass(!showPass)}></i>
                        <input id={"photo-password"} type={showPass ? "text" : "password"}/>
                    </form>
                    <button id={"modal-close-btn"} type={"button"} onClick={() => {
                        setModalVisible(false)
                        setSection(homeSection)
                    }}>X
                    </button>
                </div>
            </Modal>
            <div id={"navigation-wrapper"}>
                <div id={"navigation-item-0"} key={"navigation-item-0"} className={"navigation-item"}
                     onClick={event => {
                         event.preventDefault()
                         setSection(homeSection)
                     }}>Úvod
                </div>
                {generateNavItem("section-1", 1, "Príprava nevesty", "/1. Príprava nevesty")}
                {generateNavItem("section-2", 2, "Príprava ženícha", "/2. Príprava ženícha")}
                {generateNavItemWithLock("section-3", 3, "Odobierka", "/3. odobierka")}
                {generateNavItem("section-4", 4, "Svadobný obrad", "/4. svadobný obrad")}
                {generateNavItemWithLock("section-5", 5, "Gratulácie", "/5. gratulácie")}
                {generateNavItemWithLock("section-6", 6, "Svadobná hostina", "/6. svadobná hostina")}
                {generateNavItemWithLock("section-7", 7, "Spoločné fotografie", "/7. Spoločné fotografie")}
                {generateNavItemWithLock("section-8", 8, "Čepčenie", "/8. Čepčenie")}
                {generateNavItem("section-9", 9, "Portrétne fotografie", "/9. umelecké portréty")}
            </div>
            {section}
        </div>
    );
}