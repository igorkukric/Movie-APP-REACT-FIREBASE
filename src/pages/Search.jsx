import { ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { searchByType } from "../services/api";

const Search = () => {
  const [category, setCategory] = useState({
    value: "movie",
    title: "Movies",
  });
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e) => {
    // const resolveCategory = category === "Movies" ? "movie" : "tv";
    e.preventDefault();
    console.log(category.value, searchText, 1);
    searchByType()
  };

  return (
    <Box mt="6">
      <Flex gap={4}>
        <Box>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {category?.title}
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => setCategory({ title: "Movie", value: "movie" })}
              >
                Movies
              </MenuItem>
              <MenuItem
                onClick={() => setCategory({ title: "Tv Shows", value: "tv" })}
              >
                Tv Shows
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <Box width={"full"}>
          <form onSubmit={handleSubmit}>
            <Flex gap={4}>
              <Input
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button type="submit"> {<Search2Icon />}</Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default Search;
