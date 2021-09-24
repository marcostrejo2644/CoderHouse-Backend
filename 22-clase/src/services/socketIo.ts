import { Server } from 'socket.io';
import moment from 'moment';
import Message from '../models/message.mongo';
import Product from '../models/product.mongo';

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

        const messages = await Message.find({});
        const products = await Product.find({});
        this.myWebSocket.emit('products', products);
        socket.emit('messagesHistory', messages);

        socket.on('chatMessage', async (email: string, msg: string) => {
          const message = new Message({
            email,
            time: moment().format('DD/MM/YYYY HH:MM:SS'),
            message: msg,
          });
          await message.save();
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
