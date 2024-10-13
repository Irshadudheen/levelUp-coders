const { v4 } = require('uuid');
const cache = require('../service/redisService');

// Create Room
const createRoom = async (req, res) => {
  const roomId = v4();
  const roomData = {
    code: "console.log('Welcome to the interview')",
    createdAt: new Date(),
  };
  
  await cache.setValue(`room:${roomId}`, roomData); // Assuming cache.set returns a promise
  res.status(201).json({ roomId });
};

// Join Room
const joinRoom = async (req, res) => {
  const { roomId } = req.params;
  const roomData = await cache.getValue(`room:${roomId}`);
  
  if (roomData) {
    res.status(200).json({ success: true, roomData });
  } else {
    res.status(404).json({ success: false, message: "Room not found" });
  }
};

// Leave Room
const leaveRoom = async (req, res) => {
  const { roomId } = req.params;
  // Logic to handle leaving the room
  // Notify other users if necessary
  res.status(200).json({ success: true, message: "Left room" });
};

// List Rooms
const listRooms = async (req, res) => {
  const keys = await cache.keys(); // Assuming you have a method to get keys from cache
  const rooms = await Promise.all(
    keys
      .filter(key => key.startsWith('room:'))
      .map(async key => ({ roomId: key.split(':')[1], roomData: await cache.getValue(key) }))
  );
  
  res.status(200).json(rooms);
};

// Get Room Details
const getRoomDetails = async (req, res) => {
  const { roomId } = req.params;
  const roomData = await cache.getValue(`room:${roomId}`);
  
  if (roomData) {
    res.status(200).json({ success: true, roomData });
  } else {
    res.status(404).json({ success: false, message: "Room not found" });
  }
};

// Update Room Code
const updateRoomCode = async (req, res) => {
  const { roomId } = req.params;
  const { code } = req.body;

  const roomData = await cache.getValue(`room:${roomId}`);
  if (roomData) {
    roomData.code = code; // Update the room's code
    await cache.setValue(`room:${roomId}`, roomData); // Store updated room data
    res.status(200).json({ success: true, message: "Code updated" });
  } else {
    res.status(404).json({ success: false, message: "Room not found" });
  }
};

// Delete Room
const deleteRoom = async (req, res) => {
  const { roomId } = req.params;
  
  const roomData = await cache.getValue(`room:${roomId}`);
  if (roomData) {
    await cache.deleteValue(`room:${roomId}`);
    res.status(200).json({ success: true, message: "Room deleted" });
  } else {
    res.status(404).json({ success: false, message: "Room not found" });
  }
};

const roomController = {
  createRoom,
  joinRoom,
  leaveRoom,
  listRooms,
  getRoomDetails,
  deleteRoom,
  updateRoomCode,
};

module.exports = roomController;
