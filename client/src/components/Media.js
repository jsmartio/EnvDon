
import React, { useState, useEffect } from "react";
import { sizeSideBar } from './_sharedFunctions'
import { Alert , Spinner } from 'reactstrap';
import { uploadFile } from './MediaFunctions'
import Dropbox  from 'dropbox'
import o from '../../package.json'

const Mediarow = (props) => {
 
    let fType = ''
    if(props.name !== undefined){
        let f = props.name.toString();
        if(f.includes('.mov') || f.includes('.avi') || f.includes('.mp4')){
            fType = "Movie"
        } else if(f.includes('.mp3') || f.includes('.wav') || f.includes('.mid') || f.includes('.snd') || f.includes('.ram')){
            fType = "Audio"
        } else {
            fType = 'Image';
        }
    }

    return (
        <div className={"donors__edit__table-row flex_container_row font-gray padding10 marginRight " + props.bgc} >
            <div className="donors__edit__table-item flex-4 leftpad15">
                <a href={o.global.dropBoxPath + props.path_display} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    >{props.name}</a>
            </div>
            <div className="donors__edit__table-item flex-4">
                {props.date}
            </div>
            <div className="donors__edit__table-item flex-2">
                {fType}
            </div>
        </div>
    )
}

const AllMediaRows = (props) => {

    console.log()
    var tog = false, bgc
  
    // the following is to stripe the lines for easier visuals
    props.mediaArr.forEach( (e,i) => {
      tog === false ? bgc = 'whitebg' : bgc = 'graybg'
      tog =! tog; 
      props.mediaArr[i].bgc = bgc;
    })

    return(
            props.mediaArr.map(media => <Mediarow 
                    name={media.name}
                    path_display={media.path_display}
                    date={media.server_modified}
                    key={media.id}
                    bgc={media.bgc}

                    dropBoxPath={props.dropBoxPath}
                    dropBoxDownloadPath={props.dropBoxDownloadPath}
                />)
    )
}


const Msgbar = (props) => {
    return (
        <Alert color="primary" className="marginRight">
            <Spinner type="grow" color="primary" className={props.spin}/> {props.msg}
        </Alert>
    )

}

export const Media = () => {

    const [mediaArr, setMediaArr] = useState([])
    const [msg, setMsg] = useState('Loading Media ...')
    const [spin, setSpin] = useState('visible')

    function onSubmit(e) {
        setSpin('visible')
        setMsg(`Uploading Media ...`)
        e.preventDefault()
        uploadFile(o.global.dropBoxAccessToken).then(res => {
            var dbx = new Dropbox.Dropbox({ accessToken: o.global.dropBoxAccessToken });
            dbx.filesListFolder({path: ''})
            .then(res => {
                document.getElementById("file-upload").value = null;
                setMediaArr([...res.entries])
                setSpin('hid')
                setMsg(`Media Upload Completed`)
            })
        })
    }

    useEffect(() => {
        document.body.style.background = "#ffffff";
        window.addEventListener('resize', sizeSideBar);
        sizeSideBar()
        var dbx = new Dropbox.Dropbox({ accessToken: o.global.dropBoxAccessToken });
        dbx.filesListFolder({path: ''})
            .then(res => {
                document.getElementById("file-upload").value = null;
                setMediaArr(res.entries)
                setSpin('hid')
                setMsg('Media has loaded from dropbox')
            })
    },[]);

    return (
        <div id="main">

            <div style={mStyle}>
                <img width="150" height="15" src="https://cfl.dropboxstatic.com/static/images/brand/logotype_white-vflRG5Zd8.svg" alt="loading" />
                Upload media to drop box
            </div>

            <section className="container main">

                <div id="formWrapper" className="height60">
                    <form noValidate onSubmit={onSubmit}>
                        <input type="file" id="file-upload" className="btn btn-primary" />
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </form>
                </div>

            </section>

            <Msgbar msg={msg} spin={spin}/>

            <div className="donors__edit__table-header flex_container_row no-shrink">
                <div className="donors__edit__table-item flex-4 leftpad15">
                    File 
                </div>
                <div className="donors__edit__table-item flex-4">
                    Date
                </div>
                <div className="donors__edit__table-item flex-2">
                    Type
                </div>
            </div>

            <AllMediaRows mediaArr={mediaArr} 
                            dropBoxPath={o.global.dropBoxPath}
                            dropBoxDownloadPath={o.global.dropBoxDownloadPath}
            />

        </div>
        
    )

}

const mStyle = {
    backgroundColor:'#007ee5', 
    margin:20,
    padding:5,
    color:'#ffffff'
}