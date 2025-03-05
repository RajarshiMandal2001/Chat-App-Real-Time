import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


// send message from curren logged in user to selected contact
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const {message} = req.body;

        let gotConversation = await Conversation.findOne({
            participants: {$all : [senderId, receiverId]},
        });

        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        };
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });
        if(newMessage){
            gotConversation.messages.push(newMessage._id);
        };
        

        await Promise.all([gotConversation.save(), newMessage.save()]);
         
        // SOCKET IO: if receiver is online then send in real time
        const receiverSocketId = getReceiverSocketId(receiverId);

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json({
            newMessage
        })
    } catch (error) {
        console.error(error);
    }
}


// get all messages b/w current logged in user and the selected contact
export const getMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;

        const conversation = await Conversation.findOne({
            participants: {$all : [senderId, receiverId]}
        })
        .populate("messages"); 
        
        return res.status(200).json(conversation?.messages);

    } catch (error) {
        console.error(error);
    }
}