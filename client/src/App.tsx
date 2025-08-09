import { Button, Container, Center, Text, Spinner, VStack, Stack} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import orsLogo from './assets/ors-192.png';
import { useState, useEffect } from 'react';
import ProductElement from './components/ProductElement';
import { Item } from './domain/Item';
import { getData , newGetData} from './helpers/HandleApiCalls';
// import { getData } from './helpers/HandleApiCalls';

function App() {

  // const temp = () => { 
  //   console.log(getData("item")); 
  // };

   const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);

  let randomNums = [1,2,3,4];

  // Fetch random data
    useEffect(() => {
      const fetchItems = async () => {
        setLoading(true)
        try {
          let output: Item[] = []; 

          randomNums.forEach((element) => {
            newGetData<Item>(`item/${element}`).then((res: Item) => {
              console.log("testing", res);
              output.push(res);
              console.log("output", output);
              
            }).catch((err) => {
              console.log(err);
            })
            
          });
          
          setItems(output);
          
        } catch (err) {
          console.error("Error fetching items:", err)
        } finally {
          setLoading(false)
        }
      }

      fetchItems()
    }, [])
  
  return (
    <>
      {/* <div>
        <img src={orsLogo} className="logo" alt="Online Rizz Shop logo" />
      </div>
      <h1>Online Rizz Shop - app page</h1> */}

      <Container>
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
        </>
      )}
      </Container>
    </>
  )
}

export default App
