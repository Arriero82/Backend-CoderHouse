import mongoose from "mongoose";

const messagesCollection = 'messages';

const messageSchema = mongoose.Schema({

})

const Messages = mongoose.model(messagesCollection, messageSchema)

export default Messages