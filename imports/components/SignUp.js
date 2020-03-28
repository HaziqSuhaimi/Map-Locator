import React from 'react'
import { TextField, Card, CardContent, CardHeader, Button } from '@material-ui/core'
import { Accounts } from 'meteor/accounts-base'

export default function SignUp({ goBack }) {

    const handleRegister = ()=>{
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const confirm = document.getElementById('confirm-password').value
        
        if(username!=='' && password!=='' && confirm!==''){
            confirmPass(password, confirm)
            .then(()=>{
                console.log(username, password, confirm)
                Accounts.createUser({
                    username,
                    password
                }, (err)=>{
                    if(err){
                        alert(err)
                    }else{
                        alert('success')
                        document.getElementById('username').value = ''
                        document.getElementById('password').value = ''
                        document.getElementById('confirm-password').value = ''
                        goBack()
                    }
                })
            })
            .catch(err=>{
                alert('password not same')
            })

        }else{
            alert('Please fill all fields')
        }
    }

    const confirmPass = (pass, con) =>{
        return new Promise((resolve, reject)=>{
            if(pass===con){
                resolve('same')
            }else{
                reject('not same')
            }
        })
    }

    return (
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
                <CardHeader style={{ padding: '10px 0px 0px 0px' }} title='Register' />
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
                        <TextField fullWidth id="confirm-password" type='password' label="confirm password" />
                        <div style={{ width: '100%', display: 'flex' }} >
                            <div style={{ flexGrow: 1 }} >
                                <Button disableElevation
                                    style={{
                                        marginTop: 30,
                                        color: '#ffb82b',
                                        borderRadius: 20
                                    }}
                                    variant='text'
                                    onClick={() => {
                                        goBack()
                                    }}

                                >Back</Button>
                            </div>
                            <Button disableElevation
                                style={{
                                    marginTop: 30,
                                    backgroundColor: '#ffb82b',
                                    color: 'white',
                                    borderRadius: 20
                                }}
                                variant='contained'
                                onClick={handleRegister}
                            >Sign up</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}