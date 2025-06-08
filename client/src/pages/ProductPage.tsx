import { Button, Grid, GridItem, Image, Text } from '@chakra-ui/react'
// import React from 'react'
import orsLogo from '../assets/ors-192x192.png'
import { Product } from '../domain/Product';

function ProductPage() {

  // TODO - change layout based on pc or phone

  // <Grid
  //   templateAreas={{
  //     base: "main",
  //     lg: `"aside main"`,
  //   }}
  //   templateColumns={{ base: "1fr", lg: "200px 1fr" }}gap="6"></Grid>

  // TODO - remove this data, when we read all data from props 

  const x : Product = {
    id: 1,
    name: "banana",
    price: 1234,
    info: "we got info here",
    "description": "we even got description here",
    image: orsLogo
  }

  //product = x;

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="6">
      
      <GridItem colSpan={2} backgroundColor={"blue.100"}>
        <Image src={x.image} backgroundColor={"blue.100"} />
      </GridItem>
      <GridItem colSpan={2} backgroundColor={"blue.100"}>
        <Text>{x.name}</Text>
        <Text>{x.price}</Text>
        <Button>add to cart</Button> 
        <Text>{x.info}</Text>
      </GridItem>
      <GridItem colSpan={4} backgroundColor={"blue.100"}> 
        <Text>{x.description}</Text>
      </GridItem>
    </Grid>
  )
}

export default ProductPage