import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

const Markers = new Mongo.Collection('markers')

Meteor.methods({
    'insertMarker': (data, _id) =>{
        const userDB = Markers.findOne({userId:_id})
        if(userDB!==undefined){
            Markers.update({userId:_id},{$push:{markers: data}}, (err, res)=>{
                if(err){
                    console.log('error', err)
                }
            })
        }else{
            const newData = {
                userId:_id,
                markers:[data]
            }
            Markers.insert(newData)
        }


    },
    'fetchPrevMarkers': _id =>{
        return Markers.find({userId:_id}, {fields:{userId:0, _id:0}}).fetch()
    },
    'markerResetAll':()=>{
        Markers.remove({})
    }
})

export default Markers