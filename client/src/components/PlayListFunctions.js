import axios from 'axios'

////// playlists 
export const updPlayListLayoutStr = (pListId,newString,theToken) => {
    return axios
        .post('/playlist/updplaylistls2', {
            pListId: pListId,
            newString: newString,
            token: theToken
        })
        .then(res => {
        return res.data
    })
    .catch(err => {
        console.log("ClientSide Error @ PlaylistFunctions > updPlayListLayoutStr " + err)
        return false
    })
}


export const removePlayList = (id,theToken) => {
    return axios
        .post('/playlist/removeplaylist2', {
            id:id,
            token: theToken
        })
        .then(res => {
            console.log('returned from removing data ' + res)
        return res.data
    })
    .catch(err => {
        console.log("ClientSide Error @ PlaylistFunctions > removePlaylist " + err)
        return false
    })
}

export const getPlayLists = theToken => {
    return axios
        .post('/playlist/getplaylist2',{ token: theToken })
        .then(res => {
        return res.data
    })
    .catch(err => {
        console.log("ClientSide Error @ PlaylistFunctions > getPlaylist " + err)
        return false
    })
}

export const addPlayLists = (pData, theToken) => {
    return axios
        .post('/playlist/addplaylist2',{
            name: pData.name,
            placement: pData.placement,
            author: pData.author,
            date: pData.date,
            startDate: pData.startDate,
            endDate: pData.endDate,
            startTime: pData.startTime,
            endTime: pData.endTime,
            playOrder: pData.playOrder,
            duration: pData.duration,
            transDuration: pData.transDuration,
            fadeIn: pData.fadeIn,
            fadeOut: pData.fadeOut,
            type: pData.type,
            asset: pData.asset,
            idp: pData.idp,
            layout: pData.layout,
            bgMovie: pData.bgMovie,
            solo: pData.solo,
            token: theToken
        })
        .then(res => {
        return res.data
    })
    .catch(err => {
        console.log("ClientSide Error @ PlaylistFunctions > addPlaylist " + err)
        return false
    })
}

////// Layouts
export const removeLayout = (id,theToken) => {
    return axios
        .post('/playlist/removelayout2', {
            id:id,
            token: theToken
        })
        .then(res => {
        return res.data
    })
    .catch(err => {
        console.log("ClientSide Error @ PlaylistFunctions > remove layout " + err)
        return false
    })
}

export const getLayouts = theToken => {
    return axios
        .post('/playlist/getlayouts2',{ token: theToken })
        .then(res => {
        //console.log(JSON.stringify(res.data))
        return res.data
    })
    .catch(err => {
        console.log("ClientSide Error @ PlaylistFunctions > getLayouts " + err)
        return false
    })
}

export const addLayout = (pData,theToken) => {
    return axios
        .post('/playlist/addlayout2',{
            title: pData.title,
            sequence_id: pData.sequenceId,
            group: pData.group,
            fadeIn: pData.fadeIn,
            fadeOut: pData.fadeOut,
            duration: pData.duration,
            layout: pData.layout,
            asset: pData.asset,
            donorLevel: pData.donorLevel,
            type: pData.type,
            text: pData.text,
            quote: pData.quote,
            token: theToken
        })
        .then(res => {
        return res.data
    })
    .catch(err => {
        console.log("ClientSide Error @ PlaylistFunctions > addSlide " + err)
        return false
    })
}

