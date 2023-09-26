import React from "react";
import {
  Container,
  Flex,
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const { user, googleSignIn, logout } = useAuth();
  const toast = useToast();

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      toast({
        title: "Success",
        description: "Welcome!",
        status: "success",
        duration: 4000,
        position: "top",
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box py="4" bg="blackAlpha.200">
      <Container maxW="container.xl">
        <Flex justifyContent="space-between">
          <Link to="/">
            <Box
              fontSize="3xl"
              fontWeight="bold"
              color="red"
              letterSpacing="wider"
              fontFamily="mono"
            >
              NETFLEX
            </Box>
          </Link>
          <Flex gap="4" alignItems="center">
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/shows">TV Shows</Link>
            <Link to="/search">Search</Link>
            {user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    size={"sm"}
                    bg="red.500"
                    name={user?.displayName || user?.email}
                  />
                </MenuButton>
                <MenuList>
                  <Link to="/watchlist">
                    <MenuItem>Watchlist</MenuItem>
                  </Link>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}
            {!user && (
              <Box cursor="pointer" onClick={handleGoogleLogin}>
                Login{" "}
              </Box>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
