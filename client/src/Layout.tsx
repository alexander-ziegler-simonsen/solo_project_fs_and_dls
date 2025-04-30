import { Outlet, useLocation } from 'react-router'
import { Provider } from './components/ui/provider'
import orsLogo from './assets/ors-192x192.png'
import { Center, Container, Flex, Text } from '@chakra-ui/react'
import App from './App'

function Layout() {
    const location = useLocation();


    return (
        <Provider>
            <Container id="header" backgroundColor={'red.600'} p={3} maxW={"1/1"}>
                <Flex gap={5}>
                    <img src={orsLogo} width={50} className="logo" alt="Online Rizz Shop logo" />
                    <Text>test</Text>
                </Flex>
            </Container>

            <Container id="main" maxW={"1/1"} p={3} minH={300} backgroundColor={'green.500'}>
                { location.pathname === "/" ? <App /> : <Outlet />}
            </Container>

            <Container id="footer" maxW={"1/1"} p={3} backgroundColor={'yellow.200'}>
                <Center>
                    <Text>this website is copyrighted by me, do not steal..... I will know if you did.</Text>
                </Center>
            </Container>
        </Provider >
    )
}

export default Layout