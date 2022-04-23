import {useEffect, useState} from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader"

export default function Slider(props) {

    const [index, setIndex] = useState(0)
    const [image, setImage] = useState(undefined);
    const [loadingImage, setLoadingImage] = useState(false)
    const numOfImages = props.paths.length
    const buttons = []

    useEffect(() => {
        const loadData = () => {
            setLoadingImage(true)
            axios.post('https://api.dropboxapi.com/2/files/get_temporary_link', {path: props.paths[index]}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.REACT_APP_DROPBOX_ACCESS_TOKEN
                }
            })
                .catch(err => console.error(err))
                .then(r => {
                    setImage(<img className={"slider-image"} key={r.data.metadata.name} src={r.data.link}
                                  alt={r.data.metadata.name}/>)
                    setLoadingImage(false)
                })
        }
        loadData()
    }, [props.paths, index])

    useEffect(() => {
        const navButtonActiveHandler = (idx) => {
            for (let i = 0; i < numOfImages; i++) {
                document.getElementById(`${props.id}-btn-${i}`).classList.remove("active")
            }
            document.getElementById(`${props.id}-btn-${idx}`).classList.add("active")
        }
        navButtonActiveHandler(index)
    }, [props.id, numOfImages, index])

    const navigate = idx => setIndex(idx)

    for (let i = 0; i < numOfImages; i++) {
        buttons.push(<button id={`${props.id}-btn-${i}`} key={`${props.id}-button-${i}`} className={"slider-btn"}
                             onClick={() => setIndex(i)}/>)
    }

    return <div id={props.id} className={"slider-wrapper"} >
        <div className={"section-header"}>{props.label}</div>
        {!loadingImage && <div className={"image-wrapper"}>{image}</div>}
        {loadingImage && <ClipLoader className={"loader"} color={"#002f50"} loading={true} size={200}/>}
        <div className={"nav-buttons-wrapper"}>
            <button className={"start-btn"} onClick={() => navigate(0)}><span>&#171;</span></button>
            <button className={"previous-btn"}
                    onClick={() => navigate((index - 1 + numOfImages) % numOfImages)}>
                <span>&#8249;</span></button>
            <p className={"progress"}>{index + 1} / {numOfImages}</p>
            <button className={"next-btn"} onClick={() => navigate((index + 1) % numOfImages)}>
                <span>&#8250;</span>
            </button>
            <button className={"end-btn"} onClick={() => navigate(numOfImages - 1)}><span>&#187;</span></button>
        </div>
        <div className={"buttons-wrapper"}>{buttons}</div>
    </div>
}