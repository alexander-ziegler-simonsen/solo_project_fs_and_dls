import { Button, Container, Image, Table } from "@chakra-ui/react"
import { useCartStore } from "../useCartStore";

function Cart() {
    const cartItems = useCartStore((state) => state.items);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    return (
        <Container>
            <div className="cart">
                <h2>Cart</h2>

                <Table.Root>
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
                </Table.Root>


            </div>
        </Container>
    )
}

export default Cart