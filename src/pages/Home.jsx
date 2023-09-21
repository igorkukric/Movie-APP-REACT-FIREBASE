import { Box, Grid, Heading } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box mt="6">
      <Heading fontSize="2xl">Trending now</Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} mt="6">
        <Box w="100%" height={"250px"} bg="blackAlpha.300" borderRadius="lg" />
        <Box w="100%" height={"250px"} bg="blackAlpha.300" borderRadius="lg" />
        <Box w="100%" height={"250px"} bg="blackAlpha.300" borderRadius="lg" />
        <Box w="100%" height={"250px"} bg="blackAlpha.300" borderRadius="lg" />
        <Box w="100%" height={"250px"} bg="blackAlpha.300" borderRadius="lg" />
      </Grid>
    </Box>
  );
};

export default Home;
