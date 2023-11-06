import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";

const CardComponent = ({ item, type }) => {
 

  return (
    <Link to={`/${type}/${item?.id}`} style={{ textDecoration: "none" }}>
      <Box borderRadius={"lg"} background="blackAlpha.300" shadow="dark-lg" >
        <Image
          src={`${imagePath}/${item?.poster_path}`}
          borderRadius={"lg"}
          objectFit={"contain"}
          width={"full"}
          height={"full"}
        />
        <Box p="2">
          <Text fontSize="md" fontWeight="semibold" textAlign="center">
            {item.title || item?.name}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default CardComponent;

