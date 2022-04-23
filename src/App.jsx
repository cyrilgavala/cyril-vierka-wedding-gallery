import './App.css';
import Section from "./components/Section";
import welcomeImage from "./images/welcome-image.png"
import {useState} from "react";
import {Modal} from '@mui/material';

export default function App() {

    const password = process.env.REACT_APP_PASSWORD

    const [selectedSection, setSelectedSection] = useState("section-0")
    const [modalVisible, setModalVisible] = useState(false)
    const [section, setSection] = useState(<div id={"section-0"} className={"section"}>
        <img id={"welcome-image"} src={welcomeImage} alt={"Welcome"}/>
    </div>)

    const sections = [
        <div id={"section-0"} className={"section"}>
            <img id={"welcome-image"} src={welcomeImage} alt={"Welcome"}/>
        </div>,
        <Section id={"section-1"} key={"section-1"} label={"Príprava nevesty"}
                 folderPath={"/1. Príprava nevesty"}/>,
        <Section id={"section-2"} key={"section-2"} label={"Príprava ženícha"}
                 folderPath={"/2. Príprava ženícha"}/>,
        <Section id={"section-3"} key={"section-3"} label={"Odobierka"}
                 folderPath={"/3. odobierka"}/>,
        <Section id={"section-4"} key={"section-4"} label={"Svadobný obrad"}
                 folderPath={"/4. svadobný obrad"}/>,
        <Section id={"section-5"} key={"section-5"} label={"Gratulácie"}
                 folderPath={"/5. gratulácie"}/>,
        <Section id={"section-6"} key={"section-6"} label={"Svadobná hostina"}
                 folderPath={"/6. svadobná hostina"}/>,
        <Section id={"section-7"} key={"section-7"} label={"Spoločné fotografie"}
                 folderPath={"/7. Spoločné fotografie"}/>,
        <Section id={"section-8"} key={"section-8"} label={"Čepenie"}
                 folderPath={"/8. Čepčenie"}/>,
        <Section id={"section-9"} key={"section-9"} label={"Portrétne fotografie"}
                 folderPath={"/9. umelecké portréty"}/>
    ]

    const selectSection = id => {
        setSelectedSection(id)
        setSection(sections.filter(section => section.props.id === id))
    }

    const selectSectionWithPass = id => {
        setSelectedSection(id)
        setModalVisible(true)
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (password !== event.target[0].value) {
            event.target.reset()
        } else {
            setModalVisible(false)
            selectSection(selectedSection)
        }
    }

    return (
        <div className="App">
            <Modal id={"modal"} open={modalVisible}>
                <div id={"modal-content"}>
                    <form className={"modal-form"} onSubmit={event => handleSubmit(event)}>
                        <label>This section is locked, please enter the password.</label>
                        <input id={"photo-password"} type={"text"}/>
                    </form>
                    <button id={"modal-close-btn"} type={"button"} onClick={() => setModalVisible(false)}>X</button>
                </div>
            </Modal>
            <div id={"navigation-wrapper"}>
                <div id={"navigation-item-0"} key={"navigation-item-0"} className={"navigation-item"}
                     onClick={() => selectSection("section-0")}>Úvod
                </div>
                <div id={"navigation-item-1"} key={"navigation-item-1"} className={"navigation-item"}
                     onClick={() => selectSection("section-1")}>Príprava nevesty
                </div>
                <div id={"navigation-item-2"} key={"navigation-item-2"} className={"navigation-item"}
                     onClick={() => selectSection("section-2")}>Príprava ženícha
                </div>
                <div id={"navigation-item-3"} key={"navigation-item-3"} className={"navigation-item"}
                     onClick={() => selectSectionWithPass("section-3")}>Odobierka <i className="fa fa-lock"/>
                </div>
                <div id={"navigation-item-4"} key={"navigation-item-4"} className={"navigation-item"}
                     onClick={() => selectSection("section-4")}>Svadobný obrad
                </div>
                <div id={"navigation-item-5"} key={"navigation-item-5"} className={"navigation-item"}
                     onClick={() => selectSectionWithPass("section-5")}>Gratulácie <i className="fa fa-lock"/>
                </div>
                <div id={"navigation-item-6"} key={"navigation-item-6"} className={"navigation-item"}
                     onClick={() => selectSectionWithPass("section-6")}>Svadobná hostina <i className="fa fa-lock"/>
                </div>
                <div id={"navigation-item-7"} key={"navigation-item-7"} className={"navigation-item"}
                     onClick={() => selectSectionWithPass("section-7")}>Spoločné fotografie <i className="fa fa-lock"/>
                </div>
                <div id={"navigation-item-8"} key={"navigation-item-8"} className={"navigation-item"}
                     onClick={() => selectSectionWithPass("section-8")}>Čepenie <i className="fa fa-lock"/>
                </div>
                <div id={"navigation-item-9"} key={"navigation-item-9"} className={"navigation-item"}
                     onClick={() => selectSection("section-9")}>Portrétne fotografie
                </div>
            </div>
            {section}
        </div>
    );
}