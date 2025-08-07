import { Box, Button, Center, Container, Flex, HStack, Image, Separator, Stack, Table, Text, Tooltip, VStack } from "@chakra-ui/react"
import { useCartStore } from "../useCartStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faRemove, faSubtract } from "@fortawesome/free-solid-svg-icons";

function Cart() {

    const countAllItems = function () {
        if (cartItems.length > 0) {
            let output = 0;

            for (const item of cartItems) {
                output += item.amount;
            }

            return output;
        }

        return 0;
    }

    const countFullPrice = function () {
        if (cartItems.length > 0) {
            let output = 0;

            for (const item of cartItems) {
                output += item.product.price;
            }

            return output;
        }

        return 0;
    }

    const cartItems = useCartStore((state) => state.items);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    return (
        <>
            <h2>Cart</h2>
            <Container>

                <Stack bg={"bg"} direction={{ base: "column", sm: "column", md: "row" }}>

                    <Box p={3} w={{ base: "full", sm: "full", md: "80.8%", }} textAlign={'center'} bg={'bg'}>
                        <Table.Root size={{ base: "sm", md: "md", lg: "lg" }}>

                            <Table.Body >
                                {cartItems.map(({ product, amount }) => (
                                    <Table.Row key={product._id} bg={"accent"}>
                                        <Table.Cell borderColor={"border"} border={"1px solid"}>
                                            <Button 
                                            bg={"danger"} 
                                            size={{ base: "xs", md: "md", lg: "lg" }} 
                                            variant={"solid"} 
                                            onClick={() => removeFromCart(product._id)}>X</Button>
                                        </Table.Cell>
                                        <Table.Cell bg={"white"} borderColor={"border"} border={"1px solid"}>
                                            <Center>
                                                <Image p={2} bg={"white"} maxH={"125px"} src={product.image} />
                                            </Center>
                                        </Table.Cell>
                                        <Table.Cell borderColor={"border"} border={"1px solid"}>{product.name}</Table.Cell>
                                        <Table.Cell borderColor={"border"} border={"1px solid"}>
                                            <Stack direction={{ base: "column", sm: "column", md: "row" }}>
                                                <Button bg={"primary"} size={{ base: "xs", md: "md", lg: "lg" }}> - </Button>
                                                <Box>{amount}x</Box>
                                                <Button bg={"primary"} size={{ base: "xs", md: "md", lg: "lg" }}> + </Button>
                                            </Stack>
                                        </Table.Cell>
                                        <Table.Cell borderColor={"border"} border={"1px solid"}>
                                            <Text>pr unit: {product.price} kr</Text><br />
                                            {amount > 1 ? <Text>full: {Math.round(product.price * amount)} kr</Text> : ""}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </Box>


                    <Box p={4} w={{ base: "full", sm: "full", md: "20.8%", }} bg={"bg"}>
                        <VStack 
                            bg={"accent"} border={"solid 1px"} borderColor={"border"} p={"5px"} m={"2px"}>
                            <Text>amount of items: {countAllItems()}</Text>

                            <Text>price in total: {countFullPrice()} kr</Text>
                        </VStack>

                        <Button bg={"primary"} onClick={() => {console.log("make order")} }>order</Button>
                    </Box>




                </Stack>
            </Container>
        </>
    )
}

export default Cart