const EventModel = require('../models/eventsModels')
const mongoose = require('mongoose')

//all events

const getAllEvents = async (req, res) => {
    try {
        const events = await EventModel.find().sort({created: -1})
        res.status(200).json(events)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getEvent = async(req, res) => {
const {id } = req.params;

if (!mongoose.Types.ObjectId.isValid(id)){
  return res.status(404).json({error: "No such event"})
}
try {
    const event = await EventModel.findById(id)
    if (!event) {
        return res.status(404).json({error: "Event does not exist"})
    }
    res.status(200).json(event)

} catch (error){
    res.status(400).json({ error: error.message });
}


}

//create new event
const addEvent = async (req, res) => {
    const { 
        title, description, start, end, ticketPrice, imageUrl, address 
    } = req.body; 

    let emptyFields = []
    if (!title) {
        emptyFields.push('title')
      }
      if (!description) {
        emptyFields.push('description')
      }
      if (!start) {
        emptyFields.push('start')
      }
      if (!end) {
        emptyFields.push('end')
      }
      if (!ticketPrice) {
        emptyFields.push('ticketPrice')
      }
      if (!imageUrl) {
        emptyFields.push('imageUrl')
      }

      // Check if any fields in the address object are missing
      if (!address || !address.house || !address.street || !address.city || !address.country || !address.postcode) {
          emptyFields.push('address.house', 'address.street', 'address.city', 'address.country', 'address.postcode')
      }

      if (emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill in all the fields", emptyFields})
      }

      try {
        //add auth middleware when created
     // const user_id = req.user._id
     const newEvent = await EventModel.create({
        title, description, start, end, ticketPrice, imageUrl, address })
        res.status(200).json(newEvent)
      } catch (error) {
        res.status(400).json({error: error.message})
      }   
}

//DELETE event
const deleteEvent = async (req, res) => {
    const {id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: "No such event"})
    }

    const eventToDelete = await EventModel.findByIdAndDelete({_id: id})
    if (!eventToDelete){
        return res.status(404).json({error: "Event does not exist"})
    }
    res.status(200).json(eventToDelete)
}

//UPDATE event
const updateEvent = async (req, res) => {
    const {id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: "No such event"})
    }

    const eventToUpdate = await EventModel.findByIdAndUpdate({_id: id}, {...req.body})
    if (!eventToUpdate) {
        return res.status(404).json({error: "Event does not exist"})
    }
    res.status(200).json(eventToUpdate)

}



module.exports = {
    getAllEvents, getEvent, addEvent, deleteEvent, updateEvent
}