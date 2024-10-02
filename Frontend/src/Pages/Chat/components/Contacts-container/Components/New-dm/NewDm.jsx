import React, { useState } from "react";
import {
  IconButton,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Box,
  VStack,
  HStack,
  Avatar,
  Text
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import apiClient from "../../../../../../lib/api-client";
import { HOST, SEARCH_CONTACT_ROUTES } from "../../../../../../utils/constants";
import { useAppStore } from "../../../../../../Store";
const NewDm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const{setSelectedChatType,setSelectedChatData}=useAppStore();
  const [searchedContacts, setSearchContacts] = useState([]);
  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACT_ROUTES,
          { searchTerm },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data.contacts) {
          setSearchContacts(response.data.contacts);
        }
      } else {
        setSearchContacts([]);
      }
    } catch (error) {
      console.log({ error });
    }
  };
  const selectNewContact=(contact)=>{
    setSelectedChatType("contact")
     setSelectedChatData(contact)
      setSearchContacts([])
  }
  return (
    <>
      <Tooltip label="Select new contact" hasArrow placement="top">
        <IconButton
          icon={<IoMdAdd />}
          aria-label="New Direct Message"
          variant="solid"
          colorScheme="blue"
          onClick={onOpen}
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please select a contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          
            <Input
              placeholder="Search new contact"
              mb={4}
              onChange={(e) => searchContacts(e.target.value)}
            />
            <Box>
              <VStack align="stretch">
                {searchedContacts.map((contact, index) => (
             <Box
             key={index}
             p={3}
             bg="gray.100"
             borderRadius="md"
             cursor="pointer"
             _hover={{ bg: "blue.100" }}
             onClick={()=>selectNewContact(contact)}
           >
             <HStack>
            
               <Avatar
                 size="md"
                 name={contact.firstName} 
                 src={`${HOST}/${contact.image}`} 
               />
               <Text>{contact.firstName}</Text>
             </HStack>
           </Box>
                ))}
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewDm;
