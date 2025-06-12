// import React from 'react'

import { Button, Avatar, Card, Center, HStack, Box, Text, Spacer } from "@chakra-ui/react";
import { Item } from "../entities/Item";

interface ProductElementProps {
  ItemValue: Item;
}

function ProductElement({ ItemValue }: ProductElementProps) {
  return (
    <Card.Root width="320px">
      <Card.Body gap="2">
        <Center>
          <Avatar.Root size="lg" shape="rounded">
            <Avatar.Image src={ItemValue.image} />
            {/* TODO - add placeholder image here */}
            <Avatar.Fallback name="Nue Camp" />
          </Avatar.Root>
        </Center>
        <Card.Title mt="2">{ItemValue.name}</Card.Title>
        <Card.Description>
          <HStack>
            <Box>
              <Text>{ItemValue.info}</Text>       
            </Box>
            <Spacer />
            <Box>
              <Text float={"right"}>{ItemValue.description}</Text>
            </Box>
          </HStack>
          <Center>
            <Text>{ItemValue.price} kr</Text>
          </Center>
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline">show more info</Button>
        <Button>add to cart</Button>
      </Card.Footer>
    </Card.Root>
  )
}

export default ProductElement