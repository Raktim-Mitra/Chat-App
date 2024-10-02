import React from 'react'
import { useAppStore } from '../../Store'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ChatContainer from './components/Chat-container/ChatContainer';
import EmptyScreenContainer from "./components/Empty-screen-container/EmptyScreenContainer"
import ContactsContainer from "./components/Contacts-container/ContactsContainer"
import { Box } from '@chakra-ui/react';
const Chat = () => {
  const {userInfo,selectedChatType} = useAppStore();
  const navigate=useNavigate();
  useEffect(() => {
   
   if(!userInfo.profileSetup) navigate("/profile")
  
  }, [userInfo,navigate])
  
  return (
    <Box 
      display="flex" 
      h="100vh" 
      w="100vw"
    >
      <ContactsContainer />
    
      {selectedChatType===undefined ? <EmptyScreenContainer />:  <ChatContainer/> }
     
    </Box>
  )
}

export default Chat