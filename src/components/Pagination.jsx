import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <Flex my={6} gap="2" alignItems="center">
      <Button isDisabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
        {"<<"}{" "}
      </Button>
      <Button
        isDisabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </Button>
      <Button
        isDisabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </Button>
      <Text>
        {currentPage} of {totalPages}{" "}
      </Text>
    </Flex>
  );
};

export default Pagination;
