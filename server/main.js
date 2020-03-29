import { Meteor } from 'meteor/meteor'
import '../imports/collections/markers'

//to reset db - comment out line below if you dont want to reset markers database on every server start 
// Meteor.call('markerResetAll')

Meteor.methods({
    'fetchUser': (_id)=>{
        return Meteor.users.findOne({_id})
    },
    'fetchToken': ()=>{
        const keys = Assets.getText('apiKey.json')
        return JSON.parse(keys).keys.googleMap
    }
})
