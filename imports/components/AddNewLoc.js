import React from 'react'
import { Meteor } from 'meteor/meteor'
import { TextField, Button, Dialog, DialogContent, DialogTitle, Divider } from '@material-ui/core'

export const AddNewLoc = (props) => {

    const handleAddToMap = () =>{
        const name = document.getElementById('name').value
        const des = document.getElementById('des').value
        const lat = document.getElementById('lat').value
        const long = document.getElementById('long').value

        if(name!=='' && des!=='' && lat!=='' && long!==''){
            const data = {
                name,
                des,
                lat,
                long
            }
            props.addmarker(data)
            Meteor.call('insertMarker', data, Meteor.userId(), (err)=>{
                if(err){
                    alert(err)
                }else{
                    // alert('Marker Added')
                }
            })
        }else{
            alert('Please fill in the fields')
        }
    }

    return (
        <Dialog fullWidth onBackdropClick={props.onBackdropClick} open={props.open} >
            <DialogTitle >Add New Location</DialogTitle>
            <DialogContent>
                <Divider />
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '30%',
                        width: '100%'
                    }}
                    noValidate autoComplete="off"
                >
                    <TextField fullWidth id="name" label="Name of the Place" />
                    <TextField fullWidth id="des" label="Description of the Place" />
                    <TextField fullWidth id="lat" label="Latitude" />
                    <TextField fullWidth id="long" label="Longitude" />
                    <Button disableElevation
                        style={{
                            marginTop: 30,
                            marginBottom:30,
                            backgroundColor: '#ffb82b',
                            color: 'white',
                            borderRadius: 20,
                            width: '50%'
                        }}
                        variant='contained'
                        onClick={handleAddToMap}
                    >Add to map</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
