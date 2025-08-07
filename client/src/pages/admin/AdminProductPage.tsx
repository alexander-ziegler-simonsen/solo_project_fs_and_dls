import { useEffect, useState } from "react"
import { getDataList, newGetData } from "../../helpers/HandleApiCalls";
import { Box, Button, Image, Input, Table } from "@chakra-ui/react";
import { Container, Spacer, Spinner, Stack, VStack, Text, Center } from "@chakra-ui/react";
import Select from "react-select";
import { SingleValue } from "react-select";
import { Item } from "../../domain/Item";
import { Category } from "../../domain/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import DeleteDialog from "../../components/admin/DeleteDialog";
import EditDialog from "../../components/admin/EditDialog";


type OptionType = { value: string; label: string; }

const PAGE_SIZE = 8;

interface PaginatedResponse<Item> {
  data: Item[]
  page: number
  limit: number
  total: number
  pages: number
}


function AdminProductPage() {

  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxinPriceInput] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState<SingleValue<OptionType>>(null);
  const [sortOrderOptions, setSortOrderOptions] = useState<OptionType[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  // selectedOption: just one selected item or null
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(null);

  // selectOptions: an array of selectable items
  const [selectOptions, setSelectOptions] = useState<OptionType[]>([]);


  const [formState, setFormState] = useState<Item>(
    {
      _id: 0,
      fk_group_id: 0,
      description: "",
      info: "",
      name: "",
      image: "",
      price: 0,
    });

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
    // debounce

  };

  const onMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPriceInput(e.target.value);
  };

  const onMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxinPriceInput(e.target.value);
  };

  const onOrderChange = (opt: SingleValue<OptionType>) => {
    setSortOrder(opt);
  };

  const startSearch = () => {
    const fetchItems = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        params.append('page', String(page))
        params.append('limit', String(PAGE_SIZE))
        if (selectedOption) {
          params.append('fk_group_id', selectedOption.value)
        }

        if (searchInput != "") {
          params.append('search', searchInput);
        }

        if (sortOrder) {
          params.append("order", sortOrder.value);
        }

        if (minPriceInput != "" && minPriceInput != null) {
          params.append("minPrice", minPriceInput);
        }

        if (maxPriceInput != "" && maxPriceInput != null) {
          params.append("maxPrice", maxPriceInput);
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
  }


  return (
    <Container maxW="container.lg" py={4}>

      <Stack direction={{ sm: "column", md: "row" }}>
        <Input bg={"bg"} id="inputSearch" flex={{ base: "100%", md: "10vw" }} type="text" placeholder="search" value={searchInput} onChange={onSreachChange} />
        <Input bg={"bg"} id="inputMinPrice" flex={{ base: "100%", md: "10vw" }} type="number" placeholder="min price" value={minPriceInput} onChange={onMinPriceChange} />
        <Input bg={"bg"} id="inputMaxPrice" flex={{ base: "100%", md: "10vw" }} type="number" placeholder="max price" value={maxPriceInput} onChange={onMaxPriceChange} />
        {/* <Spacer w={{base: "100%", md: "30vw"}} /> */}
        <Box flex={{ base: "100%", md: "10vw" }}>
          <Select value={sortOrder} options={sortOrderOptions} onChange={onOrderChange} placeholder="set sort order..." />
        </Box>

      </Stack>
      <Spacer p={1} />
      <Button bg={"primary"} w={{ base: "100%" }} onClick={startSearch}>
        <FontAwesomeIcon icon={faSearch} size="xl" />
      </Button>
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


          <Table.Root gap="10" size={{ base: "sm", md: "md", lg: "lg" }}>
            <Table.Header>
              <Table.Row bg={"accent"}>
                <Table.ColumnHeader>id</Table.ColumnHeader>
                <Table.ColumnHeader>name</Table.ColumnHeader>
                <Table.ColumnHeader>price</Table.ColumnHeader>
                <Table.ColumnHeader>info</Table.ColumnHeader>
                <Table.ColumnHeader>description</Table.ColumnHeader>
                <Table.ColumnHeader>image</Table.ColumnHeader>
                <Table.ColumnHeader>fk_group_id</Table.ColumnHeader>
                <Table.ColumnHeader>options</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body >
              {items.length ? (
                items.map(item => (
                  <Table.Row key={item._id} textAlign={"center"} bg={"accent"}>
                    <Table.Cell p={2}>{item._id}</Table.Cell>
                    <Table.Cell p={2}>{item.name}</Table.Cell>
                    <Table.Cell p={2}>{item.price}</Table.Cell>
                    <Table.Cell p={2}>{item.info}</Table.Cell>
                    <Table.Cell p={2}>{item.description}</Table.Cell>
                    <Table.Cell>
                      <Center>
                        <Image maxW={"80px"} maxH={"80px"} src={item.image} />
                      </Center>
                    </Table.Cell>
                    <Table.Cell><Center>{item.fk_group_id}</Center></Table.Cell>
                    <Table.Cell p={2}>
                      <Stack>
                        {/* <Button bg={"orange.400"} onClick={() => openFormEditModal(item)}
                        >edit</Button> */}

                        <EditDialog SetValuesFunc={() => setFormState(item)}
                          titleValue="Edit this item"
                          bodyData={
                            <>
                              Name
                              <Input bg={"bg"}
                                value={formState?.name}
                                onChange={(e) => {
                                  setFormState((prev) => ({ ...prev, name: e.target.value } as Item))
                                }}
                                placeholder="name" type="text" /><br />
                              Price
                              <Input bg={"bg"}
                                value={formState?.price}
                                onChange={(e) => {
                                  setFormState((prev) => ({ ...prev, price: parseInt(e.target.value) } as Item))
                                }}
                                placeholder="price" type="number" /><br />
                              info
                              <Input bg={"bg"} value={formState?.info}
                                onChange={(e) => {
                                  setFormState((prev) => ({ ...prev, info: e.target.value } as Item))
                                }}
                                placeholder="price" type="text" /><br />
                              description
                              <Input bg={"bg"} value={formState?.description}
                                onChange={(e) => {
                                  setFormState((prev) => ({ ...prev, description: e.target.value } as Item))
                                }}
                                placeholder="description" type="text" /><br />
                              image link
                              <Input bg={"bg"} value={formState?.image}
                                onChange={(e) => {
                                  setFormState((prev) => ({ ...prev, image: e.target.value } as Item))
                                }}
                                placeholder="image" type="text" /><br />
                              fk_group_id
                              <Input bg={"bg"} value={formState?.fk_group_id}
                                onChange={(e) => {
                                  setFormState((prev) => ({ ...prev, fk_group_id: parseInt(e.target.value) } as Item))
                                }}
                                placeholder="fk_group_id" type="number" /><br />
                            </>
                          }
                          OnEditFunc={() => { console.log("onDeleteFunc item", item._id) }} />

                        {/* <Button bg={"danger"}>delete</Button> */}

                        <DeleteDialog titleValue="delete item" bodyData={
                          <Text>
                            id: {item._id}<br /><br />
                            price: {item.price}<br /><br />
                            info: {item.info}<br /><br />
                            description: {item.description}<br /><br />
                            image: {item.image}<br /><br />
                            fk_group_id: {item.fk_group_id}<br /><br />
                          </Text>
                        }
                          OnDeleteFunc={() => { console.log("onDeleteFunc item", item._id) }} />
                      </Stack>
                    </Table.Cell>
                  </Table.Row>


                  // <ProductElement key={item._id} ItemValue={item} />
                ))
              ) : (
                <Table.Row key="1" bg={"accent"}>
                  <Table.Cell>No items found.</Table.Cell>
                  <Table.Cell>No items found.</Table.Cell>
                  <Table.Cell>No items found.</Table.Cell>
                  <Table.Cell>No items found.</Table.Cell>
                  <Table.Cell>No items found.</Table.Cell>
                  <Table.Cell>No items found.</Table.Cell>
                  <Table.Cell>No items found.</Table.Cell>
                  <Table.Cell>No items found.</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>


          <Center mt={6}>
            <Button onClick={() => setPage(prev => Math.max(1, prev - 1))} disabled={page === 1} mr={4}>
              <FontAwesomeIcon icon={faArrowLeft} size="xl" />
            </Button>
            <Text>Page {page} of {totalPages}</Text>
            <Button onClick={() => setPage(prev => Math.min(totalPages, prev + 1))} disabled={page === totalPages} ml={4}>
              <FontAwesomeIcon icon={faArrowRight} size="xl" />
            </Button>
          </Center>
        </>
      )}
    </Container>
  )
}


export default AdminProductPage

