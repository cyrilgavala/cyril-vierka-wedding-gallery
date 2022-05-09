import {useEffect, useState} from "react";
import axios from "axios"
import Slider from "./Slider";

export default function Section({id, label, folderPath}) {

    const [paths, setPaths] = useState([])

    useEffect(() => {
        const loadPaths = () => {
            axios.post('https://api.dropboxapi.com/2/files/list_folder', {
                path: folderPath,
                recursive: false,
                include_media_info: false,
                include_deleted: false
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.REACT_APP_DROPBOX_ACCESS_TOKEN
                }
            })
                .catch(err => console.error(err))
                .then(r => setPaths(r.data.entries.map(entry => entry.path_display).sort()))
                .catch(err => console.error(err))
        }
        loadPaths()
    }, [folderPath])

    return <div id={id} className={"section"}>
        {paths.length > 0 && <Slider id={`${id}-slider`} label={label} paths={paths}/>}
    </div>
}