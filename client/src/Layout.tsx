import { Outlet, useLocation } from 'react-router'
// import orsLogo from './assets/ors-192.png'
import { Container } from '@chakra-ui/react'
import App from './App'
import Header from './components/Header';
import Footer from './components/Footer';

function Layout() {
    const location = useLocation();


    return (
        <>
            <Header />

            <Container id="main" p={3} backgroundColor={'surface'}>
                {location.pathname === "/" ? <App /> : <Outlet />}
            </Container>

            <Footer />
        </ >
    )
}

export default Layout