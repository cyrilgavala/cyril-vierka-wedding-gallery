import {useEffect, useState} from "react";
import axios from "axios"
import Slider from "./Slider";
import RingLoader from "react-spinners/RingLoader"

export default function Section(props) {

    const [paths, setPaths] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const loadPaths = () => {
            setLoading(true)
            axios.post('https://api.dropboxapi.com/2/files/list_folder', {
                path: props.folderPath,
                recursive: false,
                include_media_info: false,
                include_deleted: false
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.REACT_APP_DROPBOX_ACCESS_TOKEN
                }
            }).catch(err => {
                setLoading(false)
                console.error(err)
            }).then(r => {
                setPaths(r.data.entries.map(entry => {
                    return entry.path_display
                }).sort())
            }).catch(err => {
                setLoading(false)
                console.error(err)
            })
            setLoading(false)
        }
        loadPaths()
    }, [props.folderPath])

    return <div id={props.id} className={"section"}>
        {isLoading && <RingLoader color={"#014f86"} loading={true} size={200}/>}
        {!isLoading && <Slider label={props.label} paths={paths}/>}
    </div>
}