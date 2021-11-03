import { Server } from 'socket.io';
import moment from 'moment';
import Message from '../models/message.mongo';
import Product from '../models/product.mongo';
import {
  addMessage,
  getAllMessages,
  Messages,
} from '../models/messageNormalzr';

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

        const messages = await getAllMessages();
        const products = await Product.find({});
        this.myWebSocket.emit('products', products);
        socket.emit('messagesHistory', messages);

        // socket.on(
        //   'chatMessage',
        //   async (
        //     email: string,
        //     lastname: string,
        //     alias: string,
        //     age: number,
        //     avatar: string,
        //     text: string
        //   ) => {
        //     const message: Messages = new Message({
        //       author: {
        //         email,
        //         alias,
        //         lastname,
        //         alias,
        //         age,
        //         avatar,
        //       },
        //       text,
        //     });
        //     await addMessage(message);
        //     this.myWebSocket.emit('sendMessage', message);
        //   }
        // );
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
