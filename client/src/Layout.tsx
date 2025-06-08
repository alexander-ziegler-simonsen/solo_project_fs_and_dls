import { Outlet, useLocation } from 'react-router'
import orsLogo from './assets/ors-192x192.png'
import { Center, Container, Flex, Text } from '@chakra-ui/react'
import App from './App'
import Header from './components/Header';
import Footer from './components/Footer';

function Layout() {
    const location = useLocation();


    return (
        <>
            <Header />

            <Container id="main" maxW={"1/1"} p={3} minH={300} backgroundColor={'green.500'}>
                {location.pathname === "/" ? <App /> : <Outlet />}
            </Container>

            <Footer />
        </ >
    )
}

export default Layout