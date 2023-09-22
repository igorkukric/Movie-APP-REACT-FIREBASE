import { useEffect, useState } from "react";
import { Box, Button, Flex, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { getMovies } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import Pagination from "../../components/Pagination";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getMovies(activePage)
      .then((res) => {
        console.log(res, "media");
        setMovies(res?.results);
        setActivePage(res?.page);
        setTotalPage(res?.total_pages);
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activePage]);

  return (
    <Box mt="6">
      <Heading fontSize="2xl">Discover Movies</Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} mt="6">
        {movies?.map((movie) =>
          isLoading ? (
            <Skeleton
              key={movie?.id}
              borderRadius={"lg"}
              background={"blackAlpha.300"}
              height={"300px"}
            />
          ) : (
            <CardComponent key={movie?.id} item={movie} type={"movie"} />
          )
        )}
      </Grid>

      {/* Pagination */}
      <Pagination
        currentPage={activePage}
        setCurrentPage={setActivePage}
        totalPages={totalPage}
      />
    </Box>
  );
};

export default Movies;
