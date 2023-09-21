import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <Flex my={6} gap="2" alignItems="center">
      <Button onClick={() => setCurrentPage(currentPage - 1)}>Prev</Button>
      <Button onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
      <Text>
        {currentPage} of {totalPages}{" "}
      </Text>
    </Flex>
  );
};

export default Pagination;
