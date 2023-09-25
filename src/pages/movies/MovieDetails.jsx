import { Box, Grid, Heading, Image, Spinner, Text } from "@chakra-ui/react";
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
          <Image src={`${imagePath}${details?.poster_path}`} borderRadius={"lg"} objectFit={"cover"} h='500px'/>
          </Box>

          <Box>
          <Heading>{details?.title} </Heading>
          <Text color="gray.400" size="xs">{details?.original_title} </Text>
          </Box>
         </Grid>
        </Box>
      )}
    </Box>
  );
};

export default MovieDetails;
