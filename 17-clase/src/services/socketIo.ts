import { Server } from 'socket.io';
import path from 'path';
import moment from 'moment';
import fs from 'fs';
import { sqLiteDB } from './knex';
// const messages: any = [];

const productsPath = path.join(__dirname, '..', '..', 'products.json');

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

class SocketService {
  //Recibe el server http y crea el server de sockets
  myWebSocket: any;
  initWsService(server: any) {
    if (!this.myWebSocket) {
      this.myWebSocket = new Server(server);
      this.myWebSocket.on('connection', async (socket: any) => {
        socket.on('newProduct', async () => {
          this.myWebSocket.emit('newProduct');
        });

        const messages = await sqLiteDB.from('messages').select();
        this.myWebSocket.emit('products', products);
        socket.emit('messagesHistory', messages);

        socket.on('chatMessage', async (email: string, msg: string) => {
          const message = {
            email,
            time: moment().format('DD/MM/YYYY HH:MM:SS'),
            message: msg,
          };
          await sqLiteDB.from('messages').insert(message);
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
