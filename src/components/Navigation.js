export default function Navigation() {

    const scrollToElement = (selector) => {
        return document.querySelector(selector).scrollIntoView({behavior: 'smooth'});
    }
    
    return <div id={"navigation-wrapper"}>
        <div className={"navigation-item"} onClick={() => scrollToElement("#section-0")}>Úvod</div>
        <div className={"navigation-item"} onClick={() => scrollToElement("#section-1")}>Príprava nevesty</div>
        <div className={"navigation-item"} onClick={() => scrollToElement("#section-2")}>Príprava ženícha</div>
        <div className={"navigation-item"} onClick={() => scrollToElement("#section-3")}>Odobierka</div>
        <div className={"navigation-item"} onClick={() => scrollToElement("#section-4")}>Svadobný obrad</div>
        <div className={"navigation-item"} onClick={() => scrollToElement("#section-5")}>Gratulácie</div>
        <div className={"navigation-item"} onClick={() => scrollToElement("#section-6")}>Svadobná hostina</div>
        <div className={"navigation-item"} onClick={() => scrollToElement("#section-7")}>Spoločné fotografie</div>
        <div className={"navigation-item"} onClick={() => scrollToElement("#section-8")}>Čepenie</div>
        <div className={"navigation-item"} onClick={() => scrollToElement("#section-9")}>Portrétne fotografie</div>
    </div>
}