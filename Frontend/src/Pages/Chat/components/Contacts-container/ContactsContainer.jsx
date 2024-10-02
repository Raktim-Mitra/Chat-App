import React from "react";
import { Box, Heading, HStack, VStack, Text } from "@chakra-ui/react";
import ProfileInfo from "./Components/Profile-info/ProfileInfo";
import NewDm from "./Components/New-dm/NewDm";
const ContactsContainer = () => {
  return (
    <Box
      w="25%"
      h="100vh"
      bg="gray.800"
      color="white"
      p={4}
      borderRight="1px solid"
      borderColor="gray.600"
      display="flex"
      flexDirection="column"
    >
      {/* Title */}
      <Heading size="md" mb={6}>
        Chats
      </Heading>

      {/* Direct Messages */}
      <HStack align="start" spacing={4} mb={8}>
        <Heading size="sm" mb={2}>
          Direct Messages
        </Heading>
        <NewDm /> {/* Adding the NewDm component */}
      </HStack>

      {/* Groups */}
      <VStack align="start" spacing={4}>
        <Heading size="sm" mb={2}>
          Groups
        </Heading>
        {/* Add Groups here */}
      </VStack>

      {/* Profile Info - Positioned at the bottom */}
      <ProfileInfo />
    </Box>
  );
};

export default ContactsContainer;
