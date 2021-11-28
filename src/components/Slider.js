import {useEffect, useState} from "react";
import axios from "axios";

export default function Slider(props) {

    const [index, setIndex] = useState(0)
    const [image, setImage] = useState(undefined);
    const numOfImages = props.paths.length

    const loadImage = (idx) => {
        axios.post('https://api.dropboxapi.com/2/files/get_temporary_link', {path: props.paths[idx]}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.REACT_APP_DROPBOX_ACCESS_TOKEN
            }
        }).catch(err => console.error(err)).then(r => {
            setImage(<img key={r.data.metadata.name} src={r.data.link} alt={r.data.metadata.name}/>)
        })
    }

    useEffect(() => {
        const loadData = () => {
            axios.post('https://api.dropboxapi.com/2/files/get_temporary_link', {path: props.paths[index]}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.REACT_APP_DROPBOX_ACCESS_TOKEN
                }
            }).catch(err => console.error(err)).then(r => {
                setImage(<img key={r.data.metadata.name} src={r.data.link} alt={r.data.metadata.name}/>)
            }).catch(err => console.error(err))
        }
        if (props.paths.length > 0) loadData()
    }, [props.paths, index])

    const start = () => {
        loadImage(0)
        setIndex(0)
    }

    const previous = () => {
        const indexToSet = (index - 1 + numOfImages) % numOfImages
        loadImage(indexToSet)
        setIndex(indexToSet)
    }

    const next = () => {
        const indexToSet = (index + 1) % numOfImages
        loadImage(indexToSet)
        setIndex(indexToSet)
    }

    const end = () => {
        loadImage(numOfImages - 1)
        setIndex(numOfImages - 1)
    }

    return <div className={"slider-wrapper"}>
        <div
            className={"section-header"}>{props.label}</div>
        {image !== undefined && <div className={"image-wrapper"}>{image}</div>}
        <div className={"buttons-wrapper"}>
            <button className={"start-btn"} onClick={start}><span>&#171;</span></button>
            <button className={"previous-btn"} onClick={previous}><span>&#8249;</span></button>
            <button className={"next-btn"} onClick={next}><span>&#8250;</span></button>
            <button className={"end-btn"} onClick={end}><span>&#187;</span></button>
        </div>
    </div>
}