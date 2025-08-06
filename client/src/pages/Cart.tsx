import { Box, Button, Container, Flex, HStack, Image, Separator, Table, Tooltip, VStack } from "@chakra-ui/react"
import { useCartStore } from "../useCartStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faRemove, faSubtract } from "@fortawesome/free-solid-svg-icons";

function Cart() {
    const cartItems = useCartStore((state) => state.items);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    return (
        <Container>

            <div className="cart">
                <h2>Cart</h2>

                <HStack>
                    <Flex direction={{ sm: "column", md: "row" }} gap={4}> 
                        <Box flex={{base: "full", md: "10vw"}} bg={"purple.100"} p={4}>
                            {cartItems.map(({ product, amount }) => (

                                <HStack backgroundColor={"blue.200"} gap={"5rem"} border={"solid 1px black"} p={"5px"} m={"2px"}>
                                    {/* button */}
                                    <Button onClick={() => removeFromCart(product._id)}>
                                        <FontAwesomeIcon icon={faRemove} size="xl" />
                                    </Button>

                                    {/* image */}
                                    <Image maxH={100} maxW={100} src={product.image} />

                                    {/* info */}
                                    <VStack>
                                        <div>{product.name}</div>
                                        <div>id: {product._id}</div>
                                    </VStack>

                                    {/* options */}
                                    <HStack>
                                        <Button>
                                            <FontAwesomeIcon icon={faSubtract} />
                                        </Button>
                                        <Box>{amount}x</Box>
                                        <Button>
                                            <FontAwesomeIcon icon={faAdd} />
                                        </Button>
                                    </HStack>

                                    {/* price */}
                                    <VStack>
                                        <div>price pr unit: {product.price}</div>
                                        <div>full price: {Math.round(product.price * amount)}</div>
                                    </VStack>

                                </HStack>

                            ))}
                        </Box>
                        <Box flex={{ base: "1 0 100%" , md: "30vw"}} bg={"orange.100"} p={4} marginEnd={"auto"}>
                            <VStack backgroundColor={"blue.200"} border={"solid 1px black"} p={"5px"} m={"2px"}>
                                <div>amount of items: x</div>

                                <div>price in total: x</div>
                            </VStack>
                        </Box>
                    </Flex>
                </HStack>

                {/* <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>name</Table.ColumnHeader>
                            <Table.ColumnHeader></Table.ColumnHeader>
                            <Table.ColumnHeader>count</Table.ColumnHeader>
                            <Table.ColumnHeader>price pr unit</Table.ColumnHeader>
                            <Table.ColumnHeader>options</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {cartItems.map(({ product, amount }) => (
                            <Table.Row key={product._id}>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell><Image maxH={100} maxW={100} src={product.image} /></Table.Cell>
                                <Table.Cell>{amount}</Table.Cell>
                                <Table.Cell>{product.price}</Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => removeFromCart(product._id)}>Remove</Button>
                                </Table.Cell>

                            </Table.Row>
                        ))}
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row bg={"gray.200"}>
                            <Table.Cell >in total: </Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell>x </Table.Cell>
                            <Table.Cell>xx.xxx kr</Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                    </Table.Footer>
                </Table.Root> */}


            </div>
        </Container>
    )
}

export default Cart