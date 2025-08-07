import orsLogo from '../assets/ors-192.png'
import { Box, Container, Flex, Image, Float } from '@chakra-ui/react'
import Navbar from './Navbar'
import { ColorModeButton } from './ui/color-mode'

function Header() {
    return (
        <Container id="header" backgroundColor={"accent"} p={3} maxW={"1/1"}>
            <Flex gap={5}>
                <Image float={'left'} src={orsLogo} width={50} className="logo" alt="Online Rizz Shop logo" />
                <Navbar />

                <Float offset={7} placement={'middle-end'}>
                    <ColorModeButton />
                </Float>
            </Flex>
        </Container>
    )
}

export default Header