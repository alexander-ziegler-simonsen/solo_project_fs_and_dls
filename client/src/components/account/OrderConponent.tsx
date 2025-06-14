import { Button, Container, Text } from "@chakra-ui/react"
import { AccountOrder } from "../../domain/AccountOrder"

import { Table } from "@chakra-ui/react"

interface OrderConponentProps {
    OrderValue: AccountOrder
}

function OrderConponent({ OrderValue }: OrderConponentProps) {

    return (
        <>
            <Container>
                {/* TODO - add all the elements here */}

                <Text>headline</Text>
                <Text>{OrderValue.ShippingPrice}</Text>

                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>product name</Table.ColumnHeader>
                            <Table.ColumnHeader>product price</Table.ColumnHeader>
                            <Table.ColumnHeader>amount</Table.ColumnHeader>
                            <Table.ColumnHeader>price combine</Table.ColumnHeader>
                            <Table.ColumnHeader>options</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {OrderValue.Items.map((orderItem, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>
                                    {/* TODO - loop all items here */}
                                    {orderItem.Item.image}<br />
                                    {orderItem.Item.name}
                                </Table.Cell>
                                <Table.Cell>{orderItem.Item.price}</Table.Cell>
                                <Table.Cell>{orderItem.Amount}</Table.Cell>
                                <Table.Cell>a lot of money, trust me</Table.Cell>
                                <Table.Cell>
                                    <Button>do stuff 1</Button>
                                    <Button>do stuff 2</Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.Cell>the total of all the above</Table.Cell>
                            <Table.Cell>shipping price {OrderValue.ShippingPrice}...</Table.Cell>
                            <Table.Cell>x (the count of total items)</Table.Cell>
                            <Table.Cell>y (conbind all the other totals)</Table.Cell>
                            <Table.Cell>
                                <Button>do main stuff 1</Button>
                                <Button>do main stuff 2</Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Footer>
                </Table.Root>
            </Container>
        </>
    )
}

export default OrderConponent