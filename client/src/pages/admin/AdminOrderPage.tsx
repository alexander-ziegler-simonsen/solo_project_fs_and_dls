import { Box, Flex } from '@chakra-ui/react'
function AdminOrderPage() {

  return (
    <div>
      <h1>admin Order page</h1>
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