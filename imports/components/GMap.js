import React, { useState, useEffect } from 'react'
import { Meteor } from 'meteor/meteor'
import GoogleMapReact from 'google-map-react'
import { Tooltip, Typography, withStyles } from '@material-ui/core'

export const Marker = ({ name, des }) => {
    const board = (name, des) => (
        <div>
            <Typography style={{ fontWeight: 'bold' }} >{name}</Typography>
            <Typography variant='caption' >{des}</Typography>
        </div>
    )
    const NewTooltip = withStyles(theme => ({
        tooltip: {
            backgroundColor: theme.palette.common.white,
            color: 'rgba(0, 0, 0, 0.87)',
            boxShadow: theme.shadows[1],
            fontSize: 11,
        },
    }))(Tooltip);


    return (
        <div>
            <NewTooltip title={board(name, des)} arrow placement='top' >
                <img width={30} src='https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png' />
            </NewTooltip>
        </div>
    )
}

const GMap = ({ children, focusTo }) => {
    const [key, setKey] = useState(undefined)

    useEffect(()=>{
        Meteor.call('fetchToken',(err, res)=>{
            if(err){
                alert(err)
            }else{
                if(res==='YOUR_GOOGLE_MAP_API_TOKEN'){
                    alert('Please use valid API key')
                }
                setKey(res)
            }
        })
    },[])

    return (
        <div style={{ height: '60vh', width: '100%' }}>
            {
                key!==undefined&&
                <GoogleMapReact
                    bootstrapURLKeys={{ key }}
                    zoom={+focusTo.zoom}
                    center={[+focusTo.lat, +focusTo.lng]}
                >
                    {children}
                </GoogleMapReact>
            }
        </div>
    )
}

export default GMap