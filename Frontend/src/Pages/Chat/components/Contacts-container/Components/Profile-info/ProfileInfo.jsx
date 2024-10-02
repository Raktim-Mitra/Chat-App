import React from 'react'
import { Box, Avatar, Heading, IconButton, HStack, background } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { useAppStore } from '../../../../../../Store';
import { HOST, LOGOUT_ROUTE } from '../../../../../../utils/constants';
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { color } from 'framer-motion';
import apiClient from '../../../../../../lib/api-client';
const ProfileInfo = () => {
  const { userInfo,setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/profile"); // Navigate to the profile page
  };
  const handleLogout=async()=>{
    try {
      const response=await apiClient.post(LOGOUT_ROUTE,{},{withCredentials:true})
      if(response.status===200){
        navigate("/auth")
          setUserInfo(null)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box mt="auto" w="100%" borderTop="1px solid" borderColor="gray.600" pt={4}>
    <HStack spacing={4} alignItems="center">
      {/* User Image */}
      <Avatar
        size="md"
        name={userInfo?.firstName}
        src={`${HOST}/${userInfo.image}`}
        bg="gray.500"
      />
      {/* User First Name */}
      <Heading size="sm" color="white">
        {userInfo?.firstName || "User"}
      </Heading>
      {/* Edit Profile Button */}
      <IconButton
        ml={"auto"}
        icon={<FaEdit />}
        aria-label="Edit Profile"
        onClick={handleEditProfile}
        colorScheme="blue"
        variant="outline"
        borderRadius={"50%"}
      />
      <IconButton
        ml={"auto"}
        icon={<IoMdLogOut />}
        aria-label="Logout"
        onClick={handleLogout}
        colorScheme="red"
        variant="outline"
        borderRadius={"50%"}
      />
    </HStack>
  </Box>
  )
}

export default ProfileInfo