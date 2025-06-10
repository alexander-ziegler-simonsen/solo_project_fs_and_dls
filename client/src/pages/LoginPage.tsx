import { Box, Field, Center, Input, VStack, Button, HStack } from "@chakra-ui/react"
import { useLocation, useNavigate } from 'react-router';


function LoginPage() {

  const navigate = useNavigate();

  return (
    <Center>
      <Box w={500}>
        <Field.Root>
          <Field.Label>Username</Field.Label>
          <Input placeholder="username" variant="outline" />
          <Field.Label>password</Field.Label>
          <Input placeholder="password" variant="outline" />
        </Field.Root>
        <Center>
          <HStack margin={3}>
            <Button>Login</Button>
            <Button onClick={() => {
              console.log("a button was pressed");
              navigate("/new_account");  }}>make new account</Button>
          </HStack>
        </Center>
      </Box>


    </Center>
  )
}

export default LoginPage