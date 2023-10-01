import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Heading, Text, useToast } from "@chakra-ui/react";
import { getDocs, collection, doc, query, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/useAuth";
import CardComponent from "../components/CardComponent";

const Watchlist = () => {
  const toast = useToast();
  const { user, uid } = useAuth();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const movies = collection(db, "movies");
    const userDocRef = doc(movies, uid);
    const favourites = collection(userDocRef, "favourites");
    const favouritesQuery = query(favourites);

    getDocs(favouritesQuery)
      .then((querySnapshot) => {
        const movies = [];
        querySnapshot?.forEach((doc) => {
          movies.push(doc?.data());
        });
        setWatchlist(movies);
      })
      .catch((err) => {
        console.log(err, "Error from firebase");
      });
  }, [user, uid]);

  console.log(watchlist, "watchlist");

  const removeFromWatchList = async (movieID) => {
    try {
      if (!user) {
        console.log("No user found!");
        throw new Error("No user found!");
      }

      const userfavouritesCollection = collection(
        db,
        "movies",
        uid,
        "favourites"
      );
      const movieDocRef = doc(userfavouritesCollection, movieID);
      await deleteDoc(movieDocRef);
      toast({
        title: "Success",
        description: "Movie removed from watchlist.",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });

      const filteredWatchlist = watchlist?.filter(
        (movie) => movie?.id.toString() !== movieID.toString()
      );
      setWatchlist(filteredWatchlist);
    } catch (error) {
      console.log(error, "error removing movie from watchlist");
    }
  };

  return (
    <Box mt="6">
      <Heading>Watchlist</Heading>
      {watchlist.length === 0 ? (
        <Text>Your watchlist is empty.</Text>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={6}
          mt="6"
        >
          {watchlist?.map((movie) => {
            return (
              <Box key={movie?.id} position="relative">
                <Button
                  position="absolute"
                  color="white"
                  zIndex={"999"}
                  background={"red"}
                  top="5px"
                  right="5px"
                  size="xs"
                  onClick={() => removeFromWatchList(movie?.id?.toString())}
                >
                  Remove
                </Button>
                <CardComponent key={movie?.id} item={movie} type="movie" />
              </Box>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default Watchlist;
