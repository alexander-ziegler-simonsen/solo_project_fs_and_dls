import { useEffect, useState } from "react"
import { getDataList } from "../../helpers/HandleApiCalls";
import { Input, Table } from "@chakra-ui/react";
import { Container, Spinner, Stack, VStack, Text } from "@chakra-ui/react";
import { Category } from "../../domain/Category";
import DeleteDialog from "../../components/admin/DeleteDialog";
import EditDialog from "../../components/admin/EditDialog";

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

  const [formState, setFormState] = useState<Category>( { _id: 0, name: "", } );

  return (
    <Container maxW="container.lg" py={4}>

      {loading ? (
        <VStack>
          <Spinner size="xl" />
          <Text fontWeight="bold">Loading…</Text>
        </VStack>
      ) : (
        <Table.Root size={{ base: "sm", md: "md", lg: "lg" }}>
          <Table.Header>
            <Table.Row bg={"accent"}>
              <Table.ColumnHeader>group id</Table.ColumnHeader>
              <Table.ColumnHeader>name</Table.ColumnHeader>
              <Table.ColumnHeader>options</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {cats.length ? (
              cats.map(cat => (
                <Table.Row key={cat._id} textAlign={"center"} bg={"accent"}>
                  <Table.Cell p={2}>{cat._id}</Table.Cell>
                  <Table.Cell p={2}>{cat.name}</Table.Cell>
                  <Table.Cell p={2}>
                    <Stack direction={{ sm: "column", md: "row" }}>
                      <EditDialog titleValue="Edit this category"
                        OnEditFunc={() => { console.log("onDeleteFunc item", cat._id) }}
                        bodyData={
                        <div>
                          Name
                          <Input bg={"bg"} value={formState?.name} onChange={(e) => {
                              setFormState( (prev) => ({ ...prev, name: e.target.value } as Category)) }}
                          />
                        </div>}
                        SetValuesFunc={() => { setFormState(cat) } }
                      />
                      <DeleteDialog titleValue="Delete this category"
                        bodyData={
                          <Text> ID: {cat._id} <br /><br />
                            Name: {cat.name} <br /><br />
                          </Text>} OnDeleteFunc={() => {
                            console.log("test delete pass func", cat._id);
                          }} />
                    </Stack>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row key="1" bg={"accent"}>
                <Table.Cell>No items found.</Table.Cell>
                <Table.Cell>No items found.</Table.Cell>
                <Table.Cell>No items found.</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>

      )}
    </Container>
  )
}


export default AdminCategoryPage