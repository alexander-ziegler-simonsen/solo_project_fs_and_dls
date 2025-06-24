// import React from 'react'

import { Button, Image, Card, Center, Text } from "@chakra-ui/react";
import { Item } from "../domain/Item";
import { useCartStore } from "../useCartStore";

interface ProductElementProps {
  ItemValue: Item;
}

function ProductElement({ ItemValue }: ProductElementProps) {

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Card.Root padding={1} maxW="sm" overflow="hidden" float={"left"}>
      <Center>
        {/* <Image rounded="lg" border="2px solid grey" maxWidth={200} maxH={150} margin={2} src={ItemValue.image}/> */}
        <Image rounded="lg" maxWidth={200} maxH={150} margin={2} src={ItemValue.image}/>
      </Center>
      <Card.Body gap="2">
        <Card.Title>{ItemValue.name}</Card.Title>
        <Card.Description>
          {ItemValue.description}
          <br/>
          .....
          <br/>
        {ItemValue.info}</Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">{ItemValue.price} kr</Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid">Buy now</Button>
        <Button variant="ghost" onClick={() => { addToCart(ItemValue, 1); } }>Add to cart</Button>
      </Card.Footer>
    </Card.Root>
  )
}

export default ProductElement