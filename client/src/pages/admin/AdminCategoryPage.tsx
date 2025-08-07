import { useEffect, useState } from "react"
import { getDataList } from "../../helpers/HandleApiCalls";
import { Button, CloseButton, Dialog, Portal, Spacer, Table } from "@chakra-ui/react";
import { Container, Spinner, Stack, VStack, Text } from "@chakra-ui/react";
import { Category } from "../../domain/Category";
import useModal from "../../hooks/useModal";
import { faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                <Table.Row>
                  <Table.ColumnHeader>group_id</Table.ColumnHeader>
                  <Table.ColumnHeader>name</Table.ColumnHeader>
                  <Table.ColumnHeader>options</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {cats.length ? (
                  cats.map(cat => (
                    <Table.Row key={cat._id} textAlign={"center"}>
                      <Table.Cell p={2}>{cat._id}</Table.Cell>
                      <Table.Cell p={2}>{cat.name}</Table.Cell>
                      <Table.Cell p={2}>
                        
                        <Stack direction={{ sm: "column", md: "row" }}>
                          <Button onClick={() => openFormEditModal(cat.name)} backgroundColor={"orange.300"}>
                            <FontAwesomeIcon icon={faEdit} size="xl" />
                          </Button>

                        <Dialog.Root motionPreset="slide-in-bottom">
                          <Dialog.Trigger asChild>
                            <Button backgroundColor={"red.500"}>
                              <FontAwesomeIcon icon={faRemove} size="xl" />
                            </Button>
                          </Dialog.Trigger>
                          <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                              <Dialog.Content>
                                <Dialog.Header>
                                  <Dialog.Title>Delete category</Dialog.Title>
                                </Dialog.Header>
                                <Dialog.Body>
                                  <p>are you sure you want to delete this category?</p>
                                  <Spacer p={1} />
                                  <p>id: {cat._id}</p>
                                  <p>name: {cat.name}</p>
                                  <Spacer p={2} />
                                </Dialog.Body>
                                <Dialog.Footer>
                                  <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </Dialog.ActionTrigger>
                                  <Button 
                                  onClick={() => deleteThisCategory({ _id: cat._id, name: cat.name, } as Category)}
                                  backgroundColor={"red.700"}>delete</Button>
                                </Dialog.Footer>
                                <Dialog.CloseTrigger asChild>
                                  <CloseButton size="sm" />
                                </Dialog.CloseTrigger>
                              </Dialog.Content>
                            </Dialog.Positioner>
                          </Portal>
                        </Dialog.Root>
                        </Stack>

                        
                      </Table.Cell>
                    </Table.Row>


                    // <ProductElement key={item._id} ItemValue={item} />
                  ))
                ) : (
                  <Table.Row key="1">
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