import React from 'react'
import { Box,Text } from '@chakra-ui/react'
const EmptyScreenContainer = () => {
  return (
    <Box 
    w="75%" 
    h="100vh" 
    bg="gray.900" 
    color="white" 
    display="flex" 
    justifyContent="center" 
    alignItems="center"
    p={4}
  >
    <Text fontSize="lg" color="gray.400">
      No chat open. Select a conversation or group to start chatting!
    </Text>
  </Box>
  )
}

export default EmptyScreenContainer