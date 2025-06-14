import { Container, Text } from "@chakra-ui/react"

import OrderConponent from "../../components/account/OrderConponent";
import { AccountOrder } from "../../domain/AccountOrder";

function AccountOrdersPage() {
  return (
    <>
      <Container>
        <Text>test orders</Text>
        <OrderConponent OrderValue={{
          Items: [
            {
              Item:
              {
                _id: 1,
                name: "string",
                price: 2,
                info: "213",
                description: "string",
                image: "string",
                fk_group_id: 2
              },
              Amount: 5,
              PriceAtTime: 120
            },
            {
              Item:
              {
                _id: 2,
                name: "string2",
                price: 22,
                info: "2132",
                description: "string2",
                image: "string2",
                fk_group_id: 2
              },
              Amount: 51,
              PriceAtTime: 1220
            },
          ],
          
          ShippingPrice: 25,
          FullPrice: 250,
          OrderNumber: 1234,
          TimeStamp: Date.now().toString(),
        } as AccountOrder} />
      </Container>
    </>
  )
}

export default AccountOrdersPage