// import React from 'react'

import { Button, Image, Card, Center, Text, Stack, HStack } from "@chakra-ui/react";
import { Item } from "../domain/Item";
import { useCartStore } from "../useCartStore";
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router";

interface ProductElementProps {
  ItemValue: Item;
}

function ProductElement({ ItemValue }: ProductElementProps) {

  // used to navigate to other pages - react Router
  const navigate = useNavigate();

  // zustand hook
  const addToCart = useCartStore((state) => state.addToCart);

  return (





    <Card.Root
      padding={1}
      backgroundColor={"white"} borderColor={"accent"}
      w={{
        base: "full", sm: "full", md: "48.8%", lg: "32.1%", xl: "18.9%", "2xl": "18.9%",
      }}>
      <Center>
        {/* <Image rounded="lg" border="2px solid grey" maxWidth={200} maxH={150} margin={2} src={ItemValue.image}/> */}
        <Image rounded="lg" maxWidth={150} maxH={75} margin={2} src={ItemValue.image} />
      </Center>
      <Card.Body backgroundColor={"border"} gap="2">
        <Card.Title>{ItemValue.name}</Card.Title>
        <Card.Description>{ItemValue.info}</Card.Description>
        <Text textStyle="2xl" fontWeight="medium" 
        letterSpacing="tight" mt="2">{ItemValue.price} kr</Text>
      </Card.Body>
      <Card.Footer backgroundColor={"border"} >
        <HStack gap={5}>
          
          <Button variant="solid" 
          backgroundColor={"primary"} 
          onClick={() => { navigate(`/product/${ItemValue._id}`); }}>view</Button>

          <Button variant="solid" 
          backgroundColor={"success"} 
          onClick={() => { addToCart(ItemValue, 1); }}>
            <FontAwesomeIcon icon={faCartPlus} size="xl" />
          </Button>
        </HStack>
      </Card.Footer>
    </Card.Root>

  )
}

export default ProductElement