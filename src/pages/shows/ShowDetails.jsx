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
import {
  doc,
  collection,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const ShowDetails = () => {
  const { user, uid } = useAuth();
  const toast = useToast();
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInWatchList, setIsInWatchList] = useState(false);

  const userFavouritesCollection = collection(db, "tv");

  useEffect(() => {
    getDetails("tv", id)
      .then((res) => {
        setDetails(res);
      })
      .catch((err) => {
        console.log(err, "err");
      });

    getVideos("tv", id)
      .then((res) => {
        const { results } = res;
        const resolveVideoType = results?.find((tv) => tv?.type === "Trailer");
        if (resolveVideoType) {
          setVideo(resolveVideoType);
        }
        setVideo(resolveVideoType);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => {
    if (uid !== null && details) {
      const showsRef = collection(db, "tv");
      const userDocRef = doc(showsRef, uid);
      const favourites = collection(userDocRef, "favourites");
      const favouritesQuery = query(favourites, where("id", "==", details?.id));

      getDocs(favouritesQuery)
        .then((querySnapshot) => {
          setIsInWatchList(!querySnapshot?.empty);
        })
        .catch((err) => {
          console.log(err, "error from getting docs");
        });
    }
  }, [details, uid]);
  console.log(details);

  const addFavouriteShow = async (tvData) => {
    try {
      if (!user) {
        console.log("No user found!");
        throw new Error("No user found!");
      }

      const userDocRef = doc(userFavouritesCollection, uid);
      const favouritesCollection = collection(userDocRef, "favourites");
      const showDocument = doc(favouritesCollection, tvData?.id?.toString());

      const docSnap = await getDoc(showDocument);

      if (docSnap.exists()) {
        toast({
          title: "Info",
          description: "Tv Serie already in the list.",
          status: "info",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      } else {
        await setDoc(showDocument, tvData);
        setIsInWatchList(true);
        toast({
          title: "Success",
          description: "Tv Serie added to watch list.",
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
      addFavouriteShow(details);
    }
  };

  return (
    <Box mt={{ base: 6, md: 12 }}>
      {isLoading ? (
        <Box textAlign="center">
          <Spinner size="lg" />
        </Box>
      ) : (
        <Box>
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 2fr" }}
            gap={[4, 6]}
            mt={[4, 6]}
          >
            <Box>
              <Image
                src={`${imagePath}${details?.poster_path}`}
                borderRadius="lg"
                objectFit="cover"
                h={{ base: "300px", md: "500px" }}
                w="100%"
              />
            </Box>

            <Box>
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                alignItems="baseline"
                gap={4}
              >
                <Heading fontSize={{ base: "xl", md: "2xl" }}>
                  {details?.name}
                </Heading>
                <Heading fontSize="sm" color="red.500">
                  {details?.episode_run_time[0]} minutes
                </Heading>
                <Heading fontSize="xl">Seasons</Heading>
                <Heading fontSize="2xl" color="red.500">
                  {details?.number_of_seasons}
                </Heading>
                <Heading fontSize="xl">
                  ( Episodes {details?.number_of_episodes} )
                </Heading>
              </Flex>
              <Heading fontSize="md" mt="2" mb="6">
                {details?.tagline}
              </Heading>
              <Flex gap={2} mb={2}>
                <Text fontSize="sm">Release Date:</Text>
                <Heading fontSize="md">
                  {details?.first_air_date.split("-").reverse().join("-")}
                </Heading>
              </Flex>
              <Flex gap={2} mb={3}>
                <Text fontSize="sm">Last Air Date:</Text>
                <Heading fontSize="md">
                  {details?.last_air_date.split("-").reverse().join("-")}
                </Heading>
              </Flex>

              <Text fontSize="sm">Rating:</Text>
              <Heading fontSize="md" mt="2" mb="6">
                {details?.vote_average.toFixed(1)}/10
              </Heading>
              <Text fontSize="sm">Votes:</Text>
              <Heading fontSize="md" mt="2" mb="6">
                {details?.vote_count}
              </Heading>

              <Text fontSize="md" my="3">
                {details?.overview}
              </Text>

              {details?.genres?.map((genre) => (
                <Tag key={genre?.id} variant="subtle" colorScheme="cyan" mr="1">
                  {genre.name}
                </Tag>
              ))}

              <Text fontSize="sm" my={4}>
                <a
                  href={details?.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {details?.homepage}
                </a>
              </Text>
              <Button onClick={handleSave}>
                {isInWatchList ? "In Watchlist" : "Add To Watchlist"}
              </Button>
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

export default ShowDetails;
