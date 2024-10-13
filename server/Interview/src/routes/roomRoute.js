const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Create a new room
router.post('/', roomController.createRoom);

// Join a room
router.get('/:roomId/join', roomController.joinRoom);

// Leave a room
router.post('/:roomId/leave', roomController.leaveRoom);

// List all rooms
router.get('/', roomController.listRooms);

// Get details of a specific room
router.get('/:roomId', roomController.getRoomDetails);

// Delete a room
router.delete('/:roomId', roomController.deleteRoom);

// Update code in a room
router.put('/:roomId/code', roomController.updateRoomCode);

module.exports = router;
