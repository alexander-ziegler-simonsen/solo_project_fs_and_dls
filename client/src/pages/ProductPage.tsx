import { Box, Button, Center, Container, Image, Spacer, Stack, Text } from '@chakra-ui/react'
// import React from 'react'
import { Item } from '../domain/Item';
import { newGetData } from '../helpers/HandleApiCalls';

import { useParams } from "react-router";
import { useEffect, useState } from 'react';
import { useCartStore } from '../useCartStore';

function ProductPage() {

  // TODO - remove this data, when we read all data from props 

  const [itemData, setItemData] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  // zustand hook
  const addToCart = useCartStore((state) => state.addToCart);

  // get product info based on it's id.
  useEffect(() => {
    const readProduct = async () => {
      console.log("readProduct was called");
      try {
        const response = await newGetData<Item>(`item/${id}`)
        console.log('🔍 raw response:', response);
        const actualItem = (response as any).data ?? response;

        console.log("test z", actualItem);
        setItemData(actualItem); // check shape here
      } catch (err) {
        console.error("Error fetching product", err);
        setItemData(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      readProduct();
    } else {
      console.warn('No `id` in URL!')
      setLoading(false);
      setItemData(null);
    }
  }, [id]);

  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : itemData ? (

        <>


          <Container>
            <Stack direction={{ base: "column", sm: "column", md: "row" }}>

              <Box p={3} w={{ base: "full", sm: "full", md: "48.8%", }} textAlign={'center'} bg={'white'}>
                <Center>
                  <Image maxH={"300px"} src={itemData.image} backgroundColor="blue.100" />
                </Center>
              </Box>


              <Box p={4} w={{ base: "full", sm: "full", md: "48.8%", }} bg={"border"}>
                <Text fontSize={"25px"} fontWeight={"700"} textStyle={"lg"}>{itemData.name}</Text>
                
                <Spacer p={2} />
                <Text>{itemData.description}</Text>
                <Spacer p={2} />
                <Text fontSize={"20px"} fontWeight={"700"}>{itemData.price} kr</Text>
                <Spacer p={2} />
                <Center><Button bg={"primary"} onClick={() => { addToCart(itemData, 1); }}>add to cart</Button></Center>
              </Box>



            </Stack>
          </Container>


        </>


      ) : (
        <p>product not found.</p>
      )}
    </div>
  );
}

export default ProductPage