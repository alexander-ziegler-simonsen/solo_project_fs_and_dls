// import React from 'react'

import { useEffect, useState } from "react"
import { getData } from "../helpers/HandleApiCalls";
import ProductElement from "../components/ProductElement";
import { Item } from "../domain/Item";
import { Container, Grid, GridItem, Text } from "@chakra-ui/react";

// TODO - check if our page being async, gives problem in the rest of the app
function CategoryPage() {

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const data: Item[] = await getData<Item>("item");
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch items", err);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  return (
    <Container>
      <Text>CategoryPage</Text>
      <Text>Here you will be able to see all the products, sorted or filtered by category.</Text>
      {loading && <p>Loading...</p>}

      <Grid templateColumns={"repeat(4, 1fr)"} gap={3}>
        {
          items.map((item) => (
            <GridItem colSpan={1}><ProductElement key={item._id} ItemValue={item} /></GridItem>
          ))
        }
      </Grid>

    </Container>
  )
}

export default CategoryPage