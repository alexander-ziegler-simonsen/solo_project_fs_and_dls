import { Flex } from '@chakra-ui/react'
// import React from 'react'
function AboutPage() {
  // const count = useAppSelector((state) => state.counter.value)
  // const dispatch = useAppDispatch()

  return (
    <div>
      <h1>AboutPage</h1>
      <p>here we will write all the text, that talks about how good our website is.</p>
      <div>
            <Flex gap={5}>
                {/* <Button onClick={ () => dispatch(increment()) } >add 1</Button>
                <Button onClick={ () => dispatch(decrement()) }>remove 1</Button>
                <Text>current value : { count }</Text> */}
            </Flex>
        </div>
    </div>
  )
}

export default AboutPage