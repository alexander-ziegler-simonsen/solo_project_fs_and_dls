import orsLogo from '../assets/ors-192.png'
import { Container, Flex } from '@chakra-ui/react'
import Navbar from './Navbar'

function Header() {
    return (
        <Container id="header" backgroundColor={'red.600'} p={3} maxW={"1/1"}>
            <Flex gap={5}>
                <img src={orsLogo} width={50} className="logo" alt="Online Rizz Shop logo" />
                <Navbar />
            </Flex>
        </Container>
    )
}

export default Header