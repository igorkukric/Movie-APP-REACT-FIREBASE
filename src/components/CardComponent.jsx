import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";

const CardComponent = ({ item, type }) => {
  const itemType = type === "movies" ? "movie" : "tv";
  console.log(item, "item");
  return (
    <Link to={`/${itemType}/${item?.id}`}>
      <Box borderRadius={"lg"} background="blackAlpha.300">
        <Image
          src={`${imagePath}/${item?.poster_path}`}
          borderRadius={"lg"}
          objectFit={"cover"}
          width={"full"}
          height={"300px"}
        />
        <Box p="2">
          <Text fontSize="sm" textAlign="center">
            {" "}
            {item.title || item?.name}{" "}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default CardComponent;
