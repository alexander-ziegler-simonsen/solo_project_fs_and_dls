// import React from 'react'

import { useEffect, useState } from "react"
import { getDataList, newGetData } from "../helpers/HandleApiCalls";
import { Box, Button, Flex, HStack, Input } from "@chakra-ui/react";
import ProductElement from "../components/ProductElement";
import { Container, Spacer, Spinner, Stack, VStack, Text, Center } from "@chakra-ui/react";
import Select from "react-select";
import { SingleValue } from "react-select";
import { Item } from "../domain/Item";
import { Category } from "../domain/Category";

type OptionType = { value: string; label: string; }

const PAGE_SIZE = 8;

interface PaginatedResponse<Item> {
  data: Item[]
  page: number
  limit: number
  total: number
  pages: number
}

// TODO - check if our page being async, gives problem in the rest of the app
function CategoryPage() {

  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxinPriceInput] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState();
  const [sortOrderOptions, setSortOrderOptions] = useState<OptionType[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  // selectedOption: just one selected item or null
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(null);

  // selectOptions: an array of selectable items
  const [selectOptions, setSelectOptions] = useState<OptionType[]>([]);


  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getDataList<Category>("item_group")
        setSelectOptions(
          cats.map(c => ({ value: String(c._id), label: c.name }))
        )
      } catch (err) {
        console.error("Error fetching categories:", err)
        setSelectOptions([])
      }
    }
    fetchCategories()
  }, []);

  useEffect(() => {
    try {
      const values = [
        { value: "price_asc", label: "sort by price (high to low)" },
        { value: "price_desc", label: "sort by price (low to high)" }
      ];

      setSortOrderOptions(values);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Fetch paginated items on mount and whenever page or selectedOption changes
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        params.append('page', String(page))
        params.append('limit', String(PAGE_SIZE))
        if (selectedOption) {
          params.append('fk_group_id', selectedOption.value)
        }

        const resp = await newGetData<PaginatedResponse<Item>>(
          `item?${params.toString()}`
        )
        setItems(resp.data)
        setTotalPages(resp.pages)
      } catch (err) {
        console.error("Error fetching items:", err)
        setItems([])
        setTotalPages(1)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [page, selectedOption])


  // Handle category change
  const onCategoryChange = (opt: SingleValue<OptionType>) => {
    setSelectedOption(opt);
    setPage(1);
  }

  const onSreachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    console.log("test", e.target.value);

    // debounce

  };

  const onMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPriceInput(e.target.value);
    console.log("min test:", e.target.value);
  };

  const onMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxinPriceInput(e.target.value);
    console.log("max test:", e.target.value);
  };

  return (
    <Container maxW="container.lg" py={4}>

      <Stack direction={{ sm: "column", md: "row" }}>
        <Input id="inputSearch" flex={{ base: "100%", md: "10vw" }} type="text" placeholder="search" value={searchInput} onChange={onSreachChange} />
        <Input id="inputMinPrice" flex={{ base: "100%", md: "10vw" }} type="number" placeholder="min price" value={minPriceInput} onChange={onMinPriceChange} />
        <Input id="inputMaxPrice" flex={{ base: "100%", md: "10vw" }} type="number" placeholder="max price" value={maxPriceInput} onChange={onMaxPriceChange} />
        {/* <Spacer w={{base: "100%", md: "30vw"}} /> */}
        <Box flex={{ base: "100%", md: "10vw" }}>
          <Select value={sortOrder} options={sortOrderOptions} placeholder="set sort order..." />
        </Box>
      </Stack>

      <Spacer p={1} />
      <Select
        value={selectedOption}
        onChange={onCategoryChange}
        options={selectOptions}
        placeholder="Filter by category…"
        isClearable
      />

      <Spacer h={4} />

      {loading ? (
        <VStack>
          <Spinner size="xl" />
          <Text fontWeight="bold">Loading…</Text>
        </VStack>
      ) : (
        <>
          <Stack direction={{ base: "column", md: "row" }} wrap="wrap" gap={4}>
            {items.length ? (
              items.map(item => (
                <ProductElement key={item._id} ItemValue={item} />
              ))
            ) : (
              <Text>No items found.</Text>
            )}
          </Stack>

          <Center mt={6}>
            <Button onClick={() => setPage(prev => Math.max(1, prev - 1))} disabled={page === 1} mr={4}>
              Previous
            </Button>
            <Text>Page {page} of {totalPages}</Text>
            <Button onClick={() => setPage(prev => Math.min(totalPages, prev + 1))} disabled={page === totalPages} ml={4}>
              Next
            </Button>
          </Center>
        </>
      )}
    </Container>
  )
}


export default CategoryPage