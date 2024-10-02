import React, { useRef, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import moment from 'moment';
import { useAppStore } from '../../../../../../Store/index.js';
import { GET_MESSAGES_ROUTE } from '../../../../../../utils/constants.js';
import apiClient from "../../../../../../lib/api-client.js"
const MessageContainer = () => {
  const scrollRef = useRef();
  const { selectedChatType, selectedChatData, selectedChatMessages, userInfo,setSelectedChatMessages } = useAppStore();
  
  useEffect(() => {
    const getMessages=async()=>{
      try {
        const response = await apiClient.post(
          GET_MESSAGES_ROUTE,
          {id:selectedChatData._id},
          {withCredentials:true},
        );
        if(response.data.messages){
          setSelectedChatMessages(response.data.messages)
        }
      } catch (error) {
        console.log({error})
      }
    }
   if(selectedChatData._id){
    if(selectedChatType==="contact") getMessages();
   }
  }, [selectedChatData,selectedChatType,setSelectedChatMessages])
  




  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChatMessages]);

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format('YYYY-MM-DD');
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <Box key={index}>
          {showDate && (
            <Box textAlign="center" color="gray.500" fontSize="sm" my={2}>
              {moment(message.timestamp).format('LL')}
            </Box>
          )}
          {selectedChatType === 'contact' && renderDMMessages(message)}
        </Box>
      );
    });
  };

  const renderDMMessages = (message) => {
    const isSender = message.sender !== selectedChatData._id; // Assuming userInfo contains the logged-in user data

    return (
      <Box
        display="flex"
        justifyContent={isSender ? 'flex-end' : 'flex-start'}
        my={2}
      >
        <Box
          bg={isSender ? 'blue.500' : 'gray.700'}
          color="white"
          px={4}
          py={2}
          borderRadius="lg"
          maxWidth="70%"
        >
          {message.messageType === 'text' && (
            <Text>{message.content}</Text>
          )}
          <Text fontSize="xs" mt={1} textAlign="right" color="gray.300">
            {moment(message.timestamp).format('LT')}
          </Text>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      flex="1"
      w="100%"
      p={4}
      bg="gray.800"
      overflowY="auto"
    >
      {renderMessages()}
      <Box ref={scrollRef} />
    </Box>
  );
};

export default MessageContainer;
