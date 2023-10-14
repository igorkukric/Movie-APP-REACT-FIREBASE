import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const maxPagesToShow = 5; 

  const renderPaginationButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <Button
          key={page}
          onClick={() => setCurrentPage(page)}
          colorScheme={currentPage === page ? "teal" : "gray"}
          mx={1}
        >
          {page}
        </Button>
      );
    }

    return buttons;
  };

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

      {renderPaginationButtons()}

      <Button
        isDisabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </Button>
      <Button
        isDisabled={currentPage === totalPages}
        onClick={() => setCurrentPage(totalPages)}
      >
        {">>"}
      </Button>
      <Text>
        {currentPage} of {totalPages}
      </Text>
    </Flex>
  );
};

export default Pagination;

