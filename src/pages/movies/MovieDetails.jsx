import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { getDetails } from "../../services/api";
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
          <Heading>{details?.title} </Heading>
          <Text color="gray.400" size="xs">{details?.original_title} </Text>
        </Box>
      )}
    </Box>
  );
};

export default MovieDetails;