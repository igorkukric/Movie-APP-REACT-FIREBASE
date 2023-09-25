import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Spinner,
  Tag,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { getDetails, imagePath } from "../../services/api";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const router = useParams();
  const [details, setDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = router;

  useEffect(() => {
    getDetails("movie", id)
      .then((res) => {
        console.log(res, "res");
        setDetails(res);
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Box mt="6">
      {isLoading ? (
        <Box textAlign="center">
          <Spinner size="lg" />
        </Box>
      ) : (
        <Box>
          <Grid templateColumns="1fr 2fr" gap={6} mt="6">
            <Box>
              <Image
                src={`${imagePath}${details?.poster_path}`}
                borderRadius={"lg"}
                objectFit={"cover"}
                h="500px"
              />
            </Box>

            <Box>
              <Flex gap={"4"} alignItems={"baseline"}>
                <Heading>{details?.title} </Heading>
                <Heading fontSize={"sm"} color={"red.500"}>
                  {details?.runtime}minutes{" "}
                </Heading>
              </Flex>
              <Heading fontSize={"md"} mt="2" mb="6">
                {details?.tagline}
              </Heading>
              <Text fontSize={"sm"}>Release Date:</Text>
              <Heading fontSize={"md"} mt="2" mb="6">
                {new Date(details?.release_date).toDateString()}{" "}
              </Heading>
              <Text fontSize={"sm"}>Rating:</Text>
              <Heading fontSize={"md"} mt="2" mb="6">
                {details?.vote_average.toFixed(1)}/10{" "}
              </Heading>
              <Text fontSize={"sm"}>Votes:</Text>
              <Heading fontSize={"md"} mt="2" mb="6">
                {details?.vote_count}
              </Heading>

              <Text fontSize={"md"} my="3">
                {details?.overview}{" "}
              </Text>

              {details?.genres?.map((genre) => (
                <Tag key={genre?.id} variant="subtle" colorScheme="cyan" mr="1">
                  {genre.name}{" "}
                </Tag>
              ))}

              <Text fontSize={"sm"} my={4}>
                <a href={details?.homepage} target="_blank" rel="noreferer">
                  {" "}
                  {details?.homepage}{" "}
                </a>
              </Text>
              <Button>Add To Watchlist</Button>
            </Box>
          </Grid>

        <Box mt={6}>
          Video
        </Box>
        </Box>
      )}
    </Box>
  );
};

export default MovieDetails;
