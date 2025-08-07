import { Box, Field, Center, Input, VStack, Button, HStack } from "@chakra-ui/react"
import { useLocation, useNavigate } from 'react-router';
import { Login} from "../helpers/HandleApiCalls";
import { useState } from "react";


function LoginPage() {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const checkLogin = (username: string, password: string) => {
    // TODO - do something to the password, before we send it
    let output = Login({username: username, password: password});
    
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  return (
    <Center>
      <Box w={500}>
        <Field.Root>
          <Field.Label>Username</Field.Label>
          <Input id="input_username" bg={"bg"} name="username" value={formData.username} onChange={handleChange}
          placeholder="username" variant="outline" />
          <Field.Label>password</Field.Label>
          <Input type="password" id="input_password" bg={"bg"} name="password" value={formData.password} onChange={handleChange}
           placeholder="password" variant="outline" />
        </Field.Root>
        <Center>
          <HStack margin={3}>
            <Button bg={"primary"} onClick={() => { checkLogin(formData.username, formData.password); } }>Login</Button>
            <Button bg={"success"} onClick={() => { navigate("/new_account");} }>make new account</Button> 
          </HStack>
        </Center>
      </Box>


    </Center>
  )
}

export default LoginPage