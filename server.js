const express = require('express');
const http = require('http');
const bidSocket = require('./sockets/bidSocket');
const authRoutes = require('./routes/auth');
const socketIo = require('socket.io');
const itemRoutes = require('./routes/item');
const bidRoutes = require('./routes/bid');
const notificationRoutes = require('./routes/notification');
const errorMiddleware = require('./middleware/errorMiddleware');
const rateLimit = require('./middlewares/rateLimit');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json()); // Ensure this line is present to parse JSON request bodies
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/users', authRoutes);
app.use('/items', itemRoutes);
app.use('/items', bidRoutes);
app.use('/notifications', notificationRoutes);

// Error handling middleware
app.use(errorMiddleware);
app.use(rateLimit);

// Pass io instance to routes/controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

bidSocket(io);