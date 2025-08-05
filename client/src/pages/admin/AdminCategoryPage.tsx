import { useEffect, useState } from "react"
import { getDataList } from "../../helpers/HandleApiCalls";
import { Button, CloseButton, Dialog, Input, Popover, Portal, Spacer, Table } from "@chakra-ui/react";
import { Container, Spinner, Stack, VStack, Text } from "@chakra-ui/react";
import { Category } from "../../domain/Category";


function AdminCategoryPage() {

  //const [items, setItems] = useState<Item[]>([]);
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [inputName, setInputName] = useState("");

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

                        <Dialog.Root motionPreset="slide-in-bottom">
                          <Dialog.Trigger asChild>
                            <Button variant="outline" size="sm">Edit</Button>
                          </Dialog.Trigger>
                          <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                              <Dialog.Content>
                                <Dialog.Header>
                                  <Dialog.Title>Edit category</Dialog.Title>
                                </Dialog.Header>
                                <Dialog.Body>
                                  <p>You can't change the id, also it is never showed to the user.</p>
                                  <Spacer p={1} />
                                  <p>id: {cat._id}</p>
                                  <p>name: {cat.name}</p>
                                  <Spacer p={2} />

                                  <Input placeholder="new name" onChange={onInputNameChange} />
                                </Dialog.Body>
                                <Dialog.Footer>
                                  <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </Dialog.ActionTrigger>
                                  <Button onClick={() => deleteThisCategory({
                                    _id: cat._id,
                                    name: inputName,
                                  } as Category)}
                                  backgroundColor={"orange.600"}>Save</Button>
                                </Dialog.Footer>
                                <Dialog.CloseTrigger asChild>
                                  <CloseButton size="sm" />
                                </Dialog.CloseTrigger>
                              </Dialog.Content>
                            </Dialog.Positioner>
                          </Portal>
                        </Dialog.Root>

                        <Dialog.Root motionPreset="slide-in-bottom">
                          <Dialog.Trigger asChild>
                            <Button>delete</Button>
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
          </Stack>
        </>
      )}
    </Container>
  )
}


export default AdminCategoryPage