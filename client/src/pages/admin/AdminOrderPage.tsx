import { Box, Flex } from '@chakra-ui/react'
// import React from 'react'
function AdminOrderPage() {
  // const count = useAppSelector((state) => state.counter.value)
  // const dispatch = useAppDispatch()

  return (
    <div>
      <h1>admin Order page</h1>
      <p>here we will write all the text, that talks about how good our website is.</p>
      <div>
            <Flex gap={5}>
                <Box bg={{ base: "blackAlpha.300", sm: "pink.300", md: "yellow.300", lg: "green.400", xl: "blue.500" }} 
                p={{ base: 2,sm: 3, md: 4, lg: 6, xl: 12 }}>test</Box>
            </Flex>
        </div>
    </div>
  )
}

export default AdminOrderPage