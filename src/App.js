import './App.css';
import Section from "./components/Section";
import Navigation from "./components/Navigation";
import welcomeImage from "./images/welcome-image.png"

export default function App() {

    return (
        <div className="App">
            <Navigation/>
            <div id={"section-0"} className={"section"}>
                <img src={welcomeImage} alt={"Welcome"}/>
            </div>
            <Section id={"section-1"} label={"Príprava nevesty"} folderPath={"/1. Príprava nevesty"}/>
            <Section id={"section-2"} label={"Príprava ženícha"} folderPath={"/2. Príprava ženícha"}/>
            <Section id={"section-3"} label={"Odobierka"} folderPath={"/3. odobierka"}/>
            <Section id={"section-4"} label={"Svadobný obrad"} folderPath={"/4. svadobný obrad"}/>
            <Section id={"section-5"} label={"Gratulácie"} folderPath={"/5. gratulácie"}/>
            <Section id={"section-6"} label={"Svadobná hostina"} folderPath={"/6. svadobná hostina"}/>
            <Section id={"section-7"} label={"Spoločné fotografie"} folderPath={"/7. Spoločné fotografie"}/>
            <Section id={"section-8"} label={"Čepenie"} folderPath={"/8. Čepčenie"}/>
            <Section id={"section-9"} label={"Portrétne fotografie"} folderPath={"/9. umelecké portréty"}/>
        </div>
    );
}