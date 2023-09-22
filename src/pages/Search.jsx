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

const Search = () => {
  const [category, setCategory] = useState("Movie")
  return (
    <Box mt="6">
      <Flex gap={4}>
        <Box>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem>Movies</MenuItem>
              <MenuItem>Tv Shows</MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <Box width={"full"}>
          <form>
            <Flex gap={4}>
              <Input placeholder="Search..." />
              <Button type="submit"> {<Search2Icon />}</Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default Search;
