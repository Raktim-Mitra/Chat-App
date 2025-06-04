import React from "react";
import { Box, Avatar, Text, VStack, HStack } from "@chakra-ui/react";
import { useAppStore } from "../Store";
import { HOST } from "../utils/constants"; // Make sure HOST is defined

const ContactList = ({ contacts, isChannel = false }) => {
    const {
        selectedChatData,
        setSelectedChatData,
        selectedChatType,
        setSelectedChatType,
        setSelectedChatMessages,
    } = useAppStore();

    const handleClick = (contact) => {
        if (isChannel) {
            setSelectedChatType("channel");
        } else {
            setSelectedChatType("contact");
        }
        if (!selectedChatData || selectedChatData._id !== contact._id) {
            setSelectedChatMessages([]);
        }
        setSelectedChatData(contact);
    };

    return (
        <VStack
            align="stretch"
            spacing={2}
            p={4}
            bg="gray.800"
            h="100%"
            overflowY="auto"
        >
            {contacts.map((contact) => (
                <Box
                    key={contact._id}
                    p={3}
                    borderRadius="md"
                    bg={
                        selectedChatData?._id === contact._id
                            ? "gray.700"
                            : "gray.900"
                    }
                    _hover={{ bg: "gray.700", cursor: "pointer" }}
                    onClick={() => handleClick(contact)}
                >
                    <HStack spacing={4}>
                        <Avatar
                            size="sm"
                            name={contact.firstName}
                            src={`${HOST}/${contact.image}`}
                        />
                        <Text color="white" fontWeight="medium">
                            {contact.firstName} {contact.lastName}
                        </Text>
                    </HStack>
                </Box>
            ))}
        </VStack>
    );
};

export default ContactList;
