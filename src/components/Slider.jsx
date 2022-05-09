import {useEffect, useState} from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader"

export default function Slider({id, label, paths}) {

    const [index, setIndex] = useState(0)
    const [image, setImage] = useState(undefined);
    const [loadingImage, setLoadingImage] = useState(false)
    const numOfImages = paths.length

    useEffect(() => {
        setIndex(0)
    }, [id])

    useEffect(() => {
        setLoadingImage(true)
        axios.post('https://api.dropboxapi.com/2/files/get_temporary_link', {path: paths[index]}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.REACT_APP_DROPBOX_ACCESS_TOKEN
            }
        })
            .catch(err => console.error(err))
            .then(r => {
                setImage(<img className={"slider-image"} key={r.data.metadata.name} src={r.data.link}
                              alt={r.data.metadata.name}/>)
            })
            .finally(() => setLoadingImage(false))
        for (let i = 0; i < numOfImages; i++) {
            document.getElementById(`${id}-btn-${i}`).classList.remove("active")
        }
        document.getElementById(`${id}-btn-${index}`).classList.add("active")
        // eslint-disable-next-line
    }, [paths, index])

    const generateButtons = () => {
        const buttons = []
        for (let i = 0; i < numOfImages; i++) {
            buttons.push(<button id={`${id}-btn-${i}`} key={`${id}-button-${i}`} className="slider-btn"
                                 onClick={() => setIndex(i)}/>)
        }
        return buttons
    }

    return <div id={id} className={"slider-wrapper"}>
        <div className={"section-header"}>{label}</div>
        {!loadingImage && <div className={"image-wrapper"}>{image}</div>}
        {loadingImage && <ClipLoader className={"loader"} color={"#002f50"} loading={true} size={200}/>}
        <div className={"buttons-wrapper"}>
            <button className={"previous-btn fa fa-arrow-left"}
                    onClick={() => setIndex((index - 1 + numOfImages) % numOfImages)}/>
            {generateButtons()}
            <button className={"next-btn fa fa-arrow-right"} onClick={() => setIndex((index + 1) % numOfImages)}/>
        </div>
    </div>
}