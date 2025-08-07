import { Box, Flex } from '@chakra-ui/react'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// import React from 'react'
function AboutPage() {
  // const count = useAppSelector((state) => state.counter.value)
  // const dispatch = useAppDispatch()

  return (
    <div>
      <h1>AboutPage</h1>
      <p>here we will write all the text, that talks about how good our website is.</p>

            <FontAwesomeIcon icon={faCartPlus}  />

      <div>


            <Flex gap={5}>
                <Box bg={{
                  base: "blackAlpha.300",
                  sm: "pink.300",
                  md: "yellow.300",
                  lg: "green.400",
                  xl: "blue.500"
                }}
                p={{
                  base: 2,
                  sm: 3,
                  md: 4,
                  lg: 6,
                  xl: 12
                }}
                >
                  test
                </Box>
                {/* <Button onClick={ () => dispatch(increment()) } >add 1</Button>
                <Button onClick={ () => dispatch(decrement()) }>remove 1</Button>
                <Text>current value : { count }</Text> */}
            </Flex>
        </div>
    </div>
  )
}

export default AboutPage