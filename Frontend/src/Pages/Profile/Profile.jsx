import React,{useState,useEffect} from 'react'
import { useAppStore } from '../../Store'
import { IoArrowBack } from 'react-icons/io5';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  VStack,
  Text,
  Stack,
} from '@chakra-ui/react';
import apiClient from '../../lib/api-client';
import { ADD_PROFILE_IMAGE_ROUTE, HOST, UPDATE_USER_ROUTE } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
const profile = () => {
  const { userInfo,setUserInfo} =useAppStore()
  console.log(userInfo)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const navigate=useNavigate()
  
  useEffect(() => {
    if(userInfo.profileSetup){
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
    }
    if(userInfo.image){
      setProfilePic(`${HOST}/${userInfo.image}`)
    }
  }, [userInfo])
  
  const handleProfilePicChange = async(event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file)); 
      const formData = new FormData();
      formData.append("profile-image",file);
      const response= await apiClient.post(ADD_PROFILE_IMAGE_ROUTE,formData,{
        withCredentials:true,
      })
      if(response.status===200 && response.data.image){
        setUserInfo({...userInfo,image:response.data.image})
      }
    }
  };


  const saveChanges = async () => {
     try {
        const response=await apiClient.post(UPDATE_USER_ROUTE,{
          firstName,
          lastName,
        },{
          withCredentials:true,
        })
        if(response.status===200 && response.data.id){
              setUserInfo({...response.data})
              navigate("/chat")
        }
     } catch (error) {
        console.log(error)
     }
  };
  return (
    <Flex
    minH="100vh"
    align="center"
    justify="center"
    bg="gray.100"
    px={6}
    py={12}
  >
    <Box
      w="100%"
      maxW="md"
      bg="white"
      p={8}
      borderRadius="lg"
      boxShadow="lg"
    >
      <VStack spacing={4} align="stretch">
        <Button
      
          leftIcon={<IoArrowBack />}
          variant="ghost"
          alignSelf="start"
        >
          Back
        </Button>

        <FormControl id="profile-pic" align="center">
          <FormLabel>Profile Picture</FormLabel>
          <Avatar size="xl" src={profilePic} mb={4} />
          <Input type="file" accept="image/*" onChange={handleProfilePicChange} name="profile-image"/>
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={userInfo.email}
            disabled={true}
            
          />
        </FormControl>
        <FormControl id="first-name">
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />
        </FormControl>

        <FormControl id="last-name">
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
          />
        </FormControl>

        <Button
          colorScheme="blue"
          onClick={saveChanges}
          isDisabled={!firstName || !lastName} // Disable if the form is incomplete
        >
          Save Changes
        </Button>
      </VStack>
    </Box>
  </Flex>
  )
}

export default profile