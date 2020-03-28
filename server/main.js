import { Meteor } from 'meteor/meteor'
import '../imports/collections/markers'

Meteor.methods({
    'fetchUser': (_id)=>{
        return Meteor.users.findOne({_id})
    },
    'fetchToken': ()=>{
        const keys = Assets.getText('apiKey.json')
        return JSON.parse(keys).keys.googleMap
    }
})

