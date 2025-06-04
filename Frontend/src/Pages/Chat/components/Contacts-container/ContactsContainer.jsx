import React, { useEffect } from "react";
import { Box, Heading, HStack, VStack, Text } from "@chakra-ui/react";
import ProfileInfo from "./Components/Profile-info/ProfileInfo";
import NewDm from "./Components/New-dm/NewDm";

import { GET_DM_CONTACTS_ROUTES } from "../../../../utils/constants";
import apiClient from "../../../../lib/api-client";
import { useAppStore } from "../../../../Store";
import ContatctList from "../../../../Components/ContatctList";
const ContactsContainer = () => {
  const {directMessagesContacts,setDirectMessagesContacts}=useAppStore()
  useEffect(() => {
     const getContacts=async()=>{
        const response=await apiClient.get(GET_DM_CONTACTS_ROUTES,{withCredentials:true})
        if(response.data.contacts){
          console.log(response.data.contacts);
          setDirectMessagesContacts(response.data.contacts)
        }
     }
     getContacts()
  }, [])
  
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
        {/* <NewDm /> */}
      </HStack>

        <ContatctList contacts={directMessagesContacts}/>
      {/* Groups */}
      {/* <VStack align="start" spacing={4}>
        <Heading size="sm" mb={2}>
          Groups
        </Heading>
       
      </VStack> */}

      {/* Profile Info - Positioned at the bottom */}
      <ProfileInfo />
    </Box>
  );
};

export default ContactsContainer;
