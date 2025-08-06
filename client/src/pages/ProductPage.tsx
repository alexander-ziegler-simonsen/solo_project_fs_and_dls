import { Button, Grid, GridItem, Image, Text } from '@chakra-ui/react'
// import React from 'react'
import orsLogo from '../assets/ors-192.png'
import { Item } from '../domain/Item';
import { newGetData } from '../helpers/HandleApiCalls';

import { useParams } from "react-router";
import { useEffect, useState } from 'react';

function ProductPage() {

  // TODO - remove this data, when we read all data from props 

  const [itemData, setItemData] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>()

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
        <Grid templateColumns="repeat(4, 1fr)" gap="6">
          <GridItem colSpan={2} backgroundColor="blue.100">
            <Image src={itemData.image} backgroundColor="blue.100" />
          </GridItem>
          <GridItem colSpan={2} backgroundColor="blue.100">
            <Text>{itemData.name}</Text>
            <Text>{itemData.price}</Text>
            <Button>add to cart</Button>
            <Text>{itemData.info}</Text>
          </GridItem>
          <GridItem colSpan={4} backgroundColor="blue.100">
            <Text>{itemData.description}</Text>
          </GridItem>
        </Grid>
      ) : (
        <p>product not found.</p>
      )}
    </div>
  );
}

export default ProductPage