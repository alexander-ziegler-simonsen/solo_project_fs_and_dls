import orsLogo from '../assets/ors-192.png'
import { Box, Container, Flex, Image } from '@chakra-ui/react'
import Navbar from './Navbar'
import { ColorModeButton } from './ui/color-mode'

function Header() {
    return (
        <Container id="header" backgroundColor={'red.600'} p={3} maxW={"1/1"}>
            <Flex gap={5}>
                <Image float={'left'} src={orsLogo} width={50} className="logo" alt="Online Rizz Shop logo" />
                <Navbar />

                <Box>
                    <ColorModeButton />
                </Box>
            </Flex>
        </Container>
    )
}

export default Header