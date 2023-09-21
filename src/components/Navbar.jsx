import React from "react";
import { Container, Flex, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <Flex gap="4">
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/shows">TV Shows</Link>
            <Link to="/search">Search</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
