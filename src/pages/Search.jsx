import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
} from "@chakra-ui/react";
import { ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { searchByType } from "../services/api";
import CardComponent from "../components/CardComponent";
import Pagination from "../components/Pagination";

const Search = () => {
  const [category, setCategory] = useState({
    value: "movie",
    title: "Movies",
  });
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [media, setMedia] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    searchByType(category?.value, searchText, 1)
      .then((res) => {
        setMedia(res?.results);
        setActivePage(res?.activePage);
        setTotalPage(res?.total_pages);
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box mt="6">
      <Flex flexDirection={{ base: "column", md: "row" }} gap={4}>
        <Box flex="1">
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

        <Box width={{ base: "full", md: "auto" }}>
          <form onSubmit={handleSubmit}>
            <Flex flexDirection={{ base: "column", md: "row" }} gap={4}>
              <Input
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button type="submit">
                <Search2Icon />
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>

      <Grid
        templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
        gap={6}
        mt="6"
      >
        {media?.map((med) =>
          isLoading ? (
            <Skeleton
              key={med?.id}
              borderRadius="lg"
              background="blackAlpha.300"
              height="300px"
            />
          ) : (
            <CardComponent key={med?.id} item={med} type={category?.value} />
          )
        )}
      </Grid>

      <Pagination
        currentPage={activePage}
        setCurrentPage={setActivePage}
        totalPages={totalPage}
      />
    </Box>
  );
};

export default Search;
