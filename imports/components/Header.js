import React from 'react'
import { Meteor } from 'meteor/meteor'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

export default function Header({logout}) {
    const handleLogout = () => {
        Meteor.logout((err)=>{
            if(err){
                alert(err)
            }else{
                logout()
            }
        })
    }

    return (
        <div style={{ marginBottom: 30 }} >
            <AppBar position='relative' className='centerize-container' style={{ backgroundColor: '#ffb82b' }} >
                <Toolbar className='main-container' >
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Map Locator
          </Typography>
                    <Button onClick={handleLogout} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}
