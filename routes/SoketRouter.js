// routes/socketRouter.js
const Message = require('../model/message');

const socketIoHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on('chat message', async (msg) => {
      try {
        const message = new Message({ username: msg.username, message: msg.message });
        await message.save();
        io.emit('chat message', msg);
      } catch (error) {
        console.error(error);
      }
    });
  });
};

module.exports = socketIoHandler;
