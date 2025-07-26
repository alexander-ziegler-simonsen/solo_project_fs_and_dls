// import React from 'react'

import { useEffect, useState } from "react"
import { getData } from "../helpers/HandleApiCalls";
import ProductElement from "../components/ProductElement";
import { Container, Spacer, Spinner, Stack, VStack, Text} from "@chakra-ui/react";
import Select from "react-select";
import { SingleValue } from "react-select";
import { Item } from "../domain/Item";
import { Category } from "../domain/Category";

// TODO - check if our page being async, gives problem in the rest of the app
function CategoryPage() {

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  // selectedOption: just one selected item or null
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(null);

  // selectOptions: an array of selectable items
  const [selectOptions, setSelectOptions] = useState<OptionType[]>([]);

  type OptionType = {
    value: string;
    label: string;
  };

  useEffect(() => {
    async function fetchItems() {
      try {
        const products: Item[] = await getData<Item>("item");
        const catData: Category[] = await getData<Category>("item_group");
        setItems(products);

        console.log("dev - all the cats ", catData);
        console.log("dev - all the products ", products);


        const mappedOptions = catData.map((cat) => ({
          value: String(cat._id),
          label: cat.name,
        }));
        setSelectOptions(mappedOptions); // ✅ Correct type: OptionType[]

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
      {/* <Text>CategoryPage</Text> */}
      {/* <Text>Here you will be able to see all the products, sorted or filtered by category.</Text> */}

      <Select value={selectedOption} onChange={setSelectedOption} options={selectOptions} />

      <Spacer h={2} />

      {loading && 
      <VStack>
        <Spinner m={"2rem"} p={"2rem"} size={"xl"}  color="red.500"  borderWidth="6px" css={{ "--spinner-track-color": "colors.gray.200" }} />
        <Text fontWeight={"bold"} textStyle={"xl"} color={"#8c278b"}>Loading...</Text>
      </VStack>
      }

      <Stack direction={ { base: "column", sm: "row" } } wrap={"wrap"} gap={3}>
        {
          items.map((item) => (
              <ProductElement key={item._id} ItemValue={item} />
          ))
        }
      </Stack>
    </Container>
  )
}

export default CategoryPage