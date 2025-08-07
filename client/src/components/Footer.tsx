import { Container, Center, Text } from '@chakra-ui/react'

function Footer() {
    return (
        <Container id="footer" maxW={"1/1"} p={3} backgroundColor={"accent"}>
            <Center>
                <Text>this website is copyrighted by me, do not steal..... I will know if you did.</Text>
            </Center>
        </Container>
    )
}

export default Footer