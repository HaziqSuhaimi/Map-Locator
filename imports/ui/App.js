import React, { useState, useEffect } from 'react'
import { Meteor } from 'meteor/meteor'
import Header from '../components/Header'
import { Typography, Card, CardActions, CardContent, Divider, Button } from '@material-ui/core'
import Login from '../components/Login'
import GMap, { Marker } from '../components/GMap'
import { AddNewLoc } from '../components/AddNewLoc'

export const App = () => {
  const [isVerified, setVerified] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [latestMarker, setLatestMarker] = useState({
    lat: 3.140853,
    lng: 101.693207,
    zoom: 11
  })
  const [user, setUser] = useState(null)
  const [markers, setMarkers] = useState([])

  const renderLogin = () => (
    <Login verified={handleVerified} />
  )

  useEffect(() => {
    Meteor.call('fetchUser', Meteor.userId(), (err, res) => {
      if (err) {
        alert(err)
      } else {
        if(res!==undefined){
          setUser(res.username)
        }
      }
    })

    Meteor.call('fetchPrevMarkers', Meteor.userId(), (err, res) => {
      if (err) {
        alert(err)
      } else {
        if(res[0]!==undefined){
          setMarkers(res[0].markers)
        }
      }
    })
  }, [isVerified])

  useEffect(() => {
    if (Meteor.userId() !== null) {
      setVerified(true)
    }
  }, [])

  const handleAddMarker = (data) => {
    setMarkers(m => [...m, data])
    const focus = {
      lat: data.lat,
      lng: data.long,
      zoom: 15
    }
    setLatestMarker(focus)
    setOpenDialog(false)
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
  }

  const renderMainPage = () => (
    <div>
      <AddNewLoc addmarker={handleAddMarker} onBackdropClick={handleDialogClose} open={openDialog} />
      <Header logout={handleLogout} />
      <div style={{ display: 'flex', justifyContent: 'center' }} >
        <div className='main-container' >
          <Card style={{ padding: 40, minHeight: '50vh', maxHeight: '75vh', borderRadius: 30 }} >
            <CardActions style={{ padding: '10px 0px 10px 0px', display: 'flex' }} >
              <Typography style={{ fontWeight: 'bold', flex: 1 }} variant='h5' >Welcome {user} </Typography>
              <Button disableElevation
                style={{
                  backgroundColor: '#ffb82b',
                  color: 'white',
                  borderRadius: 20
                }}
                variant='contained'
                onClick={handleOpenDialog}
              >Add New</Button>
            </CardActions>
            <Divider />
            <CardContent style={{padding:'20px 0px 10px 0px'}} >
              <GMap focusTo={latestMarker} >
                {
                  markers.map(({ name, des, lat, long }, i) => (
                    <Marker
                      key={i}
                      lat={+lat}
                      lng={+long}
                      name={name}
                      des={des}
                    />
                  ))
                }
              </GMap>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const handleVerified = () => {
    setVerified(true)
  }

  const handleLogout = () => {
    setVerified(false)
    location.reload()
  }

  return (
    <div >
      {
        isVerified ? renderMainPage() : renderLogin()
      }
    </div>
  )
}
