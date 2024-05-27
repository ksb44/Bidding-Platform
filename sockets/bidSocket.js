
const bidSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join', (itemId) => {
      socket.join(itemId);
      console.log(`User joined item ${itemId}`);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  return io;
};

module.exports = bidSocket;

