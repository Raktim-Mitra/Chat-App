import React from 'react';
import { Box, Text, Avatar, HStack, IconButton } from '@chakra-ui/react';
import { IoMdCloseCircle } from "react-icons/io";
import { useAppStore } from '../../../../../../Store';
import { HOST } from '../../../../../../utils/constants';

const ChatHeader = () => {
  const {closeChat,selectedChatData}=useAppStore()
  return (
    <Box
      w="100%"
      h="60px"
      bg="gray.700"
      p={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      {/* Chat Avatar and Name */}
      <HStack spacing={3}>
        <Avatar
          size="md"
          name={selectedChatData.firstName}
          src={`${HOST}/${selectedChatData.image}`}
        />
        <Text fontWeight="bold" fontSize="lg" color="white">
          {selectedChatData.firstName}
        </Text>
      </HStack>

      {/* Close Button */}
      <IconButton
        icon={<IoMdCloseCircle /> }
        aria-label="Close Chat"
        onClick={closeChat}
        colorScheme="red"
        variant="outline"
        size="sm"
      />
    </Box>
  )
}

export default ChatHeader