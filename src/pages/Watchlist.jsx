import React, { useState, useEffect } from "react";
import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import { getDocs, collection, doc, query } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/useAuth";
import CardComponent from "../components/CardComponent";

const Watchlist = () => {
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
            return <CardComponent key={movie?.id} item={movie} type="movie" />;
          })}
        </Grid>
      )}
    </Box>
  );
};

export default Watchlist;
