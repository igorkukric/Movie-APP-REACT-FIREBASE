import { useEffect, useState } from "react";
import { Box, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { getTvShows } from "../../services/api";
import CardComponent from "../../components/CardComponent";

const Shows= () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTvShows()
      .then((res) => {
        // console.log(res, 'media')
        setMovies(res?.results);
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Box mt="6">
      <Heading fontSize="2xl">Discover Tv Shows </Heading>
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
            <CardComponent key={movie?.id} item={movie} />
          )
        )}
      </Grid>
    </Box>
  )
};

export default Shows;