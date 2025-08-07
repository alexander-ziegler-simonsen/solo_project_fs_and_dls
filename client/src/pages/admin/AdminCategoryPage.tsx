import { useEffect, useState } from "react"
import { getDataList } from "../../helpers/HandleApiCalls";
import { Button, Table } from "@chakra-ui/react";
import { Container, Spinner, Stack, VStack, Text } from "@chakra-ui/react";
import { Category } from "../../domain/Category";
import useModal from "../../hooks/useModal";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteDialog from "../../components/admin/DeleteDialog";

function AdminCategoryPage() {

  //const [items, setItems] = useState<Item[]>([]);
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [inputName, setInputName] = useState("");

  const { showModal } = useModal();

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

  const onInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
    console.log("name test:", e.target.value);
  };

  const saveNewName = (catWithNewName: Category) => {
    console.log("new cat name", catWithNewName);
  }

  const deleteThisCategory = (catToBeDeleted: Category) => {
    console.log("we are deleting this cat", catToBeDeleted);
  }

    const openFormEditModal = (currentName: string) => {
    showModal({
      type: 'form-input',
      title: 'edit category',
      fields: [
        { name: 'Name', type: 'text', label: 'name', placeholder: 'name', initValue: currentName }
      ],
      onConfirm: (data) => {
        // the values given
        console.log(`Modtog: ${JSON.stringify(data)}`);
      },
    });
  };

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
                          <Button onClick={() => openFormEditModal(cat.name)} backgroundColor={"orange.300"}>
                            <FontAwesomeIcon icon={faEdit} size="xl" />
                          </Button>

                        <DeleteDialog titleValue="Delete this category" 
                        bodyData={
                        <Text> ID: {cat._id} <br/><br/>
                        Name: {cat.name} <br/><br/>
                        </Text>}  OnDeleteFunc={() => {
                          console.log("test delete pass func", cat._id);
                        } } />

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
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Root>
          
      )}
    </Container>
  )
}


export default AdminCategoryPage