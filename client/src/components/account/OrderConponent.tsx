import { Button, Container, Text } from "@chakra-ui/react"
import { AccountOrder } from "../../domain/AccountOrder"

import { Table } from "@chakra-ui/react"

interface OrderConponentProps {
    OrderValue: AccountOrder
}

function OrderConponent({ OrderValue }: OrderConponentProps) {

    return (
        <>

                {/* TODO - add all the elements here */}

                <Text>headline</Text>
                <Text>{OrderValue.ShippingPrice}</Text>

                <Table.Root size={{ base: "sm", md: "md", lg: "lg" }}>
                    <Table.Header >
                        <Table.Row bg={"accent"}> 
                            <Table.ColumnHeader>product name</Table.ColumnHeader>
                            <Table.ColumnHeader>product price</Table.ColumnHeader>
                            <Table.ColumnHeader>amount</Table.ColumnHeader>
                            <Table.ColumnHeader>price combine</Table.ColumnHeader>
                            <Table.ColumnHeader>options</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body >
                        {OrderValue.Items.map((orderItem, index) => (
                            <Table.Row key={index} bg={"accent"}>
                                <Table.Cell>
                                    {/* TODO - loop all items here */}
                                    {orderItem.Item.image}<br />
                                    {orderItem.Item.name}
                                </Table.Cell>
                                <Table.Cell>{orderItem.Item.price}</Table.Cell>
                                <Table.Cell>{orderItem.Amount}</Table.Cell>
                                <Table.Cell>a lot of money, trust me</Table.Cell>
                                <Table.Cell>
                                    <Button>do</Button>
                                    <Button>do</Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row bg={"accent"}>
                            <Table.Cell>the total</Table.Cell>
                            <Table.Cell>ship: {OrderValue.ShippingPrice}</Table.Cell>
                            <Table.Cell>x (total items)</Table.Cell>
                            <Table.Cell>y (conbind totals)</Table.Cell>
                            <Table.Cell>
                                <Button>do</Button>
                                <Button>do</Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Footer>
                </Table.Root>

        </>
    )
}

export default OrderConponent