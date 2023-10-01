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
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { getDetails, getVideos, imagePath } from "../../services/api";
import { useParams } from "react-router-dom";
import VideoComponent from "../../components/VideoComponent";
import { useAuth } from "../../context/useAuth";
import { db } from "../../firebase";
import { doc, collection, setDoc, getDoc } from "firebase/firestore";

const MovieDetails = () => {
  const { user, uid } = useAuth();
  const toast = useToast();
  const router = useParams();
  const [details, setDetails] = useState({});
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userFavouritesCollection = collection(db, "movies");

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

    getVideos("movie", id).then((res) => {
      console.log(res, "video res");
      const { results } = res;
      const resolveVideoType = results?.find(
        (movie) => movie?.type === "Trailer"
      );
      //console.log(resolveVideoType, 'resolve')
      if (resolveVideoType) {
        setVideo(resolveVideoType);
      }
      setVideo(resolveVideoType);
    });
  }, []);

  const addFavouriteMovie = async (movieData) => {
    try {
      if (!user) {
        console.log("No user found!");
        throw new Error("No user found!");
      }

      const userDocRef = doc(userFavouritesCollection, uid);
      const favouritesCollection = collection(userDocRef, "favourites");
      const movieDocument = doc(
        favouritesCollection,
        movieData?.id?.toString()
      );

      const docSnap = await getDoc(movieDocument);

      if (docSnap.exists()) {
        toast({
          title: "Info",
          description: "Movie already in the list.",
          status: "info",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      } else {
        await setDoc(movieDocument, movieData);
        // todo: local state change
        toast({
          title: "Success",
          description: "Movie added to watch list.",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error, "error from firebase");
    }
  };

  const handleSave = () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please login to save.",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      return;
    } else {
      console.log("save");
      addFavouriteMovie(details);
    }
  };

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
              <Button onClick={handleSave}>Add To Watchlist</Button>
            </Box>
          </Grid>

          <Box mt={6}>
            {video !== null && <VideoComponent id={video?.key} />}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MovieDetails;
