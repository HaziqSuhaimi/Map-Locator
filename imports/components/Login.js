import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'
import { TextField, Card, CardContent, CardHeader, Button} from '@material-ui/core'
import SignUp from './SignUp'

export default function Login({verified}) {
    const [isRegistered, setRegister] = useState(true)
    const renderLogin = () => (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <Card
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxHeight: '50vh',
                    borderRadius: 30,
                    border: 'solid rgba(0,0,0,.3) 1px',
                    width: 400
                }}
                elevation={5}
            >
                <CardHeader style={{ padding: '10px 0px 0px 0px' }} title='Login' />
                <CardContent style={{ width: '90%' }} >
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
                        <TextField fullWidth id="username" label="username" />
                        <TextField fullWidth id="password" type='password' label="password" />
                        <Button disableElevation
                            style={{
                                marginTop: 30,
                                backgroundColor: '#ffb82b',
                                color: 'white',
                                borderRadius: 20,
                                width: '50%'
                            }}
                            variant='contained'
                            onClick={handleLogin}
                        >Login</Button>
                        <Button onClick={goToRegister} style={{ width: '50%', borderRadius: 20, marginTop: 10 }} color='primary' >Register</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )

    const renderSignUp = () => (
        <SignUp goBack={back} />
    )

    const goToRegister = () => {
        setRegister(false)
    }

    const back = () => {
        setRegister(true)
    }

    const handleLogin = () => {
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value

        if (username !== '' && password !== '') {
            Meteor.loginWithPassword(username, password, (err)=>{
                if(err){
                    alert(err)
                }else{
                    document.getElementById('username').value = ''
                    document.getElementById('password').value = ''
                    verified()
                }
            })
        } else {
            alert('Please fill all fields')
        }
    }

    return (
        <div>
            {
                isRegistered ? renderLogin() : renderSignUp()
            }
        </div>
    )
}