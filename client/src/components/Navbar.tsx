import { Box, Flex, HStack, Link } from "@chakra-ui/react";
import { NavLink } from "react-router";

const links = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Category", to: "/category" }
];

function Navbar() {
    return (
        <Box px={4}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <HStack spaceX={6} spaceY={6} alignItems="center">
                    {links.map((link) => (

                        <Link bg={"gray.400"}
                            as={NavLink} 
                            key={link.to} 
                            to={link.to} 
                            px={2} 
                            py={1} rounded="md"
                            _hover={{ textDecoration: "none", bg: "gray.200" }} 
                            _activeLink={{ color: "gray.300", fontWeight: "bold" }} >
                            {link.name}
                        </Link>
                    ))}
                </HStack>
            </Flex>
        </Box>
    )
}

export default Navbar