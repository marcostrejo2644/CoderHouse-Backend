import { Server } from 'socket.io';
import path from 'path';
import moment from 'moment';
import fs from 'fs';
const messages: any = [];

const productsPath = path.join(__dirname, '..', '..', 'products.json');

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

class SocketService {
  //Recibe el server http y crea el server de sockets
  myWebSocket: any;
  initWsService(server: any) {
    if (!this.myWebSocket) {
      this.myWebSocket = new Server(server);
      this.myWebSocket.on('connection', (socket: any) => {
        socket.on('newProduct', () => {
          this.myWebSocket.emit('newProduct');
        });

        this.myWebSocket.emit('products', products);
        socket.emit('messagesHistory', messages);

        socket.on('chatMessage', (email: string, msg: string) => {
          const message = {
            email,
            time: moment().format('DD/MM/YYYY HH:MM:SS'),
            message: msg,
          };
          messages.push(message);
          this.myWebSocket.emit('sendMessage', message);
        });
      });
    }
    return this.myWebSocket;
  }

  //devuelve el WSService
  getServer() {
    return this.myWebSocket;
  }
}

export const socketService = new SocketService();
