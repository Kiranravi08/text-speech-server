const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http'); 
const { Server } = require('socket.io'); 
const { TranslationServiceClient } = require('@google-cloud/translate');
const textToSpeech = require('@google-cloud/text-to-speech');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: '*', 
  },
});

const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let globalTranscription = '';

// Socket.io setup
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });

  socket.on('transcription', (data) => {
    globalTranscription = data.transcription;
    io.emit('transcription-update', { transcription: globalTranscription });
  });

  socket.on('get-transcription', () => {
    socket.emit('transcription-update', { transcription: globalTranscription });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
