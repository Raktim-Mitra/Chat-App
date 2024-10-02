import React from 'react'
import { Box } from '@chakra-ui/react'
import ChatHeader from "./Components/Chat-header/ChatHeader"
import MessageContainer from "./Components/Message-container/MessageContainer"
import MessageBar from './Components/Message-bar/MessageBar'
const ChatContainer = () => {
  return (
    <Box 
    w="75%" 
    h="100vh" 
    bg="gray.900" 
    color="white" 
    display="flex"
    flexDirection="column"
  >
   <ChatHeader/>
   <MessageContainer/>
   <MessageBar/>
  </Box>
  )
}

export default ChatContainer