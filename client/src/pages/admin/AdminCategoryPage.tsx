import { useEffect, useState } from "react"
import { getDataList } from "../../helpers/HandleApiCalls";
import { Table } from "@chakra-ui/react";
import { Container, Spinner, Stack, VStack, Text } from "@chakra-ui/react";
import { Category } from "../../domain/Category";


function AdminCategoryPage() {

  //const [items, setItems] = useState<Item[]>([]);
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const cats = await getDataList<Category>("item_group")
        setCats(cats);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err)
        setCats([])
      }
    }
    fetchCategories()
  }, []);

  return (
    <Container maxW="container.lg" py={4}>

      {loading ? (
        <VStack>
          <Spinner size="xl" />
          <Text fontWeight="bold">Loading…</Text>
        </VStack>
      ) : (
        <>

          <Stack direction={{ base: "column", md: "row" }} wrap="wrap" gap={4}>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>group_id</Table.ColumnHeader>
                  <Table.ColumnHeader>name</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {cats.length ? (
                  cats.map(cat => (
                    <Table.Row key={cat._id} textAlign={"center"}>
                      <Table.Cell p={2}>{cat._id}</Table.Cell>
                      <Table.Cell p={2}>{cat.name}</Table.Cell>
                    </Table.Row>


                    // <ProductElement key={item._id} ItemValue={item} />
                  ))
                ) : (
                  <Table.Row key="1">
                      <Table.Cell>No items found.</Table.Cell>
                      <Table.Cell>No items found.</Table.Cell>
                    </Table.Row>
                )}
              </Table.Body>
            </Table.Root>
          </Stack>
        </>
      )}
    </Container>
  )
}


export default AdminCategoryPage