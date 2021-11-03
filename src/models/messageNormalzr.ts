// import { normalize, schema } from 'normalizr';
// import messages from './message.mongo';

// export interface Messages {
//   author: {
//     email: string;
//     name: string;
//     lastname: string;
//     alias: string;
//     age: number;
//     avatar: string;
//   };
//   text: string;
// }

// const author = new schema.Entity('author', {}, { idAttribute: 'email' });
// const msg = new schema.Entity(
//   'message',
//   { author: author },
//   { idAttribute: '_id' }
// );

// const msgSchema = new schema.Array<Messages>(msg);

// export const getAllMessages = async () => {
//   const messagesMap: Messages[] = (await messages.find()).map((msg: any) => ({
//     _id: msg._id,
//     author: msg.author,
//     text: msg.text,
//   }));

//   let normalizedMessages = normalize(messagesMap, msgSchema);

//   return normalizedMessages;
// };

// export const addMessage = async (msg: schema.Entity<Messages>) => {
//   const msgs = new messages(msg);
//   const newMessage = await msgs.save();
//   return newMessage;
// };
