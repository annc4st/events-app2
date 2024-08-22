const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema( {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    start: {
        type: Date,
        required: [true, "Start time and date are required"]
    },
    end: {
        type: Date,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true

    },
    imageUrl: {
        type: String,
        required: true

    },
    address: {
        house: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
      
        city: {
            type: String,
            required: true
        },
      country: {
            type: String,
            required: true
        },
        postcode: {
            type: String,
            required: true
        }
    }
})

module.exports = mongoose.model('Event', eventSchema);