import React from 'react'
import { useFormik } from 'formik';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Box, FormControl, FormLabel, Input, Button, FormErrorMessage } from '@chakra-ui/react';
import apiClient from '../../lib/api-client';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '../../utils/constants';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../Store';
const Auth = () => {
    const {setUserInfo}=useAppStore();
    const navigate=useNavigate()
    const loginFormik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validate: values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        },
        onSubmit: values => {
          // Login submission logic
          handleLogin(values);
        },
      });
    
      
      const signUpFormik = useFormik({
        initialValues: {
          email: '',
          password: '',
          confirmPassword: '',
        },
        validate: values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords must match';
          }
          return errors;
        },
        onSubmit: values => {
          // Sign-up submission logic
          handleSignUp(values);
        },
      });
    
  
      const handleLogin = async(values) => {
        try{
            const {email,password}=values;
        const response=await apiClient.post(LOGIN_ROUTE,{email,password},{withCredentials:true})
     
        if(response.data.user.id){
            setUserInfo(response.data.user);
            if(response.data.user.profileSetup) navigate("/chat");
            else navigate("/profile")
        }
        } catch(error){
            console.log("login error", error);
        }
      };
    
     
      const handleSignUp = async(values) => {
        const {email,password}=values;
        const response=await apiClient.post(SIGNUP_ROUTE,{email,password},{withCredentials:true})
        console.log('Sign Up Values:', response);
        if(response.status===201) {
            setUserInfo(response.data.user);
            navigate("/profile");
        }
      };
  return (
    <>
    <Flex
      justify="center"
      align="center"
      height="100vh"
      backgroundColor="#2E236C"
    >
      <Box
        width="500px"
        height="450px"
        border="0px"
        borderWidth="1px"
        borderRadius="20px"
        padding="0 px"
        boxShadow="lg"
        color="black"
        backgroundColor="white"
      >
        <Tabs isFitted variant="enclosed">
          <TabList
            mb="1em"
            borderRadius="20px 20px 0 0"
            backgroundColor="#070F2B"
          >
            <Tab
              width="260px"
              height="50px"
              color="white"
              borderRadius="20px 20px 0 0"
            >
              Login
            </Tab>
            <Tab
              height="50px"
              color="white"
              borderRadius="20px 20px 0 0"
            >
              Sign in
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <form onSubmit={loginFormik.handleSubmit}>
                <FormControl id="email" mb="4" isInvalid={loginFormik.errors.email && loginFormik.touched.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}
                    value={loginFormik.values.email}
                  />
                  <FormErrorMessage>{loginFormik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl id="password" mb="4" isInvalid={loginFormik.errors.password && loginFormik.touched.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}
                    value={loginFormik.values.password}
                  />
                  <FormErrorMessage>{loginFormik.errors.password}</FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  width="full"
                  backgroundColor="#FFC94A"
                  colorScheme="yellow"
                >
                  Login
                </Button>
              </form>
            </TabPanel>
            <TabPanel>
              <form onSubmit={signUpFormik.handleSubmit}>
                <FormControl id="email" mb="4" isInvalid={signUpFormik.errors.email && signUpFormik.touched.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={signUpFormik.handleChange}
                    onBlur={signUpFormik.handleBlur}
                    value={signUpFormik.values.email}
                  />
                  <FormErrorMessage>{signUpFormik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl id="password" mb="4" isInvalid={signUpFormik.errors.password && signUpFormik.touched.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={signUpFormik.handleChange}
                    onBlur={signUpFormik.handleBlur}
                    value={signUpFormik.values.password}
                  />
                  <FormErrorMessage>{signUpFormik.errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl id="confirm-password" mb="4" isInvalid={signUpFormik.errors.confirmPassword && signUpFormik.touched.confirmPassword}>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    onChange={signUpFormik.handleChange}
                    onBlur={signUpFormik.handleBlur}
                    value={signUpFormik.values.confirmPassword}
                  />
                  <FormErrorMessage>{signUpFormik.errors.confirmPassword}</FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  width="full"
                  backgroundColor="#FFC94A"
                  colorScheme="yellow"
                >
                  Sign in
                </Button>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  </>
  )
}

export default Auth