const express = require('express');


const {getAllEvents, getEvent, addEvent, deleteEvent, updateEvent} = require ('../controllers/eventController')


const router = express.Router();


//Middleware for authentication
//router.use(requireAuth);

//Routes

router.get('/', getAllEvents);
router.get('/:id',getEvent);
router.post('/', addEvent);
router.delete('/:id', deleteEvent);
router.patch('/:id',updateEvent);

module.exports = router;