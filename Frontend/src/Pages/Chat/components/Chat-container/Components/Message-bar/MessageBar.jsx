import { Box, Input, IconButton, Flex } from "@chakra-ui/react";
import { IoSend, IoAttach } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { useState } from "react";

import EmojiPicker from 'emoji-picker-react';
import { useAppStore } from "../../../../../../Store";
import { useSocket } from "../../../../../../Context/SocketContext";

const MessageBar = () => {
  const [message, setMessage] = useState("");
  const socket=useSocket()
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
 const{selectedChatType,selectedChatData,userInfo}=useAppStore()
  const handleEmojiClick = (emojiData) => {
    setMessage(message + emojiData.emoji);
    setShowEmojiPicker(false); // Hide emoji picker after selection
  };
 const handleSendMessage=async()=>{
     if(selectedChatType==="contact"){
       socket.emit("sendMessage",{
        sender:userInfo.id,
        content:message,
        recipient:selectedChatData._id,
        messageType:"text",
        fileUrl:undefined,
       })
     }
 }
  return (
    <Box>
      <Flex
        w="100%"
        h="60px"
        bg="gray.700"
        p={4}
        alignItems="center"
        position="relative"
      >
        {/* Emoji Picker button */}
        <IconButton
          icon={<BsEmojiSmile />}
          aria-label="Open Emoji Picker"
          colorScheme="yellow"
          mr={2}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        />

        {/* Emoji Picker dropdown */}
        {showEmojiPicker && (
          <Box
            position="absolute"
            bottom="70px"
            left="10px"
            zIndex={1000}
            boxShadow="md"
          >
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </Box>
        )}

        {/* File Attachment button */}
        <IconButton
          icon={<IoAttach />}
          aria-label="Attach File"
          colorScheme="gray"
          mr={2}
        />

        {/* Message Input */}
        <Input
          placeholder="Type your message"
          bg="gray.600"
          color="white"
          mr={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Send Button */}
        <IconButton
          icon={<IoSend />}
          aria-label="Send Message"
          colorScheme="blue"
          onClick={handleSendMessage}
        />
      </Flex>
    </Box>
  )
}

export default MessageBar