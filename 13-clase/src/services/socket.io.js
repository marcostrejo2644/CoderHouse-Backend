import sio from 'socket.io';
let io = null;

export const ioF = function () {
  return io;
};

export const initialize = function (server) {
  return (io = sio(server));
};
