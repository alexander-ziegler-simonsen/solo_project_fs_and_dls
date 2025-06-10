import { Box, Field, Center, Input, Button, HStack } from "@chakra-ui/react";
import { PasswordInput } from "../components/ui/password-input";
import { useState } from "react";
import { toaster, Toaster } from "../components/ui/toaster";
import { PostOneData } from "../helpers/HandleApiCalls";
import { User } from "../entities/User";

function NewAccountPage() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    username: "",
    password: "",
  });

  const toast = (toastConfig: any) => { toaster.create(toastConfig) };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id.replace("in_", "")]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // TODO - make this call the API
      await PostOneData<User>("user", {
        "username": formData.username,
        "password": formData.password,
        "email": formData.email,
        "phone": formData.phone,
        "address": formData.address
      } as User );

      toast({
        title: "Account created.",
        description: "User has been successfully registered.",
        type: "success",
        duration: 5000,
        isClosable: true,
      });

      setFormData({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        address: "",
        username: "",
        password: "",
      });
    } catch (error: any) {
      toast({
        title: "Error.",
        description: error.message || "Something went wrong.",
        type: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Center>
        <Box w={500}>
          <Field.Root>
            <Field.Label id="fname">firstname</Field.Label>
            <Input bg="white" id="in_fname" placeholder="firstname" variant="outline" value={formData.fname} onChange={handleChange} />

            <Field.Label id="lname">lastname</Field.Label>
            <Input bg="white" id="in_lname" placeholder="lastname" variant="outline" value={formData.lname} onChange={handleChange} />

            <Field.Label id="email">email</Field.Label>
            <Input bg="white" id="in_email" placeholder="email" variant="outline" value={formData.email} onChange={handleChange} />

            <Field.Label id="phone">phone number</Field.Label>
            <Input bg="white" id="in_phone" placeholder="phone number" variant="outline" value={formData.phone} onChange={handleChange} />

            <Field.Label id="address">address</Field.Label>
            <Input bg="white" id="in_address" placeholder="address" variant="outline" value={formData.address} onChange={handleChange} />

            <Field.Label id="username">Username</Field.Label>
            <Input bg="white" id="in_username" placeholder="username" variant="outline" value={formData.username} onChange={handleChange} />

            <Field.Label id="password">password</Field.Label>
            <PasswordInput bg="white" id="in_password" placeholder="password" variant="outline" value={formData.password} onChange={handleChange} />
          </Field.Root>

          <Center>
            <HStack margin={3}>
              <Button colorScheme="teal" onClick={handleSubmit}>Make New Account</Button>
            </HStack>
          </Center>
        </Box>
      </Center>
      <Toaster />
    </>
  )
}

export default NewAccountPage