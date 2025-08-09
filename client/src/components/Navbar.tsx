import { Box, Button, Center, HStack, Link, Menu, Portal } from "@chakra-ui/react";
import { NavLink } from "react-router";

const links = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Category", to: "/category" },
    { name: "Login", to: "/login" },
    { name: "Cart", to: "/cart" },
    { name: "a_product", to: "/admin_product" },
    { name: "a_category", to: "/admin_category" }
    // ,
    // { name: "u_orders", to: "/a_orders" },
    // { name: "u_orders", to: "/a_info" },
];

function Navbar() {
    return (
        <Center>
            <Box  display={{ base: 'flex', md: 'none' }}>
                <Menu.Root>
                <Menu.Trigger asChild>
                    <Button bg={"primary"} variant="solid" size="sm">
                        Menu
                    </Button>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner bg={"bg"}>
                        <Menu.Content>
                            {links.map((link) => (
                                <Menu.Item value={link.to} as={NavLink} key={link.to} to={link.to}>
                                    {link.name}
                                </Menu.Item>
                            ))}
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
            </Box>

            <HStack gap={3} display={{ base: 'none', md: 'flex' }}>
                {links.map((link) => (

                    <Link 
                        as={NavLink} key={link.to} to={link.to} px={2} py={1} rounded="md" 
                        _hover={{ textDecoration: "none", bg: "muted" }} 
                        _activeLink={{ color: "primary", fontWeight: "bold" }}>
                        {link.name}
                    </Link>
                ))}
            </HStack>
        </Center>


    )
}

export default Navbar