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
  const [watchlistType, setWatchlistType] = useState("movies");

  useEffect(() => {
    if (!user) {
      return;
    }

    const type = watchlistType === "movies" ? "movies" : "tv";
    const items = collection(db, type);
    const userDocRef = doc(items, uid);
    const favorites = collection(userDocRef, "favourites");
    const favoritesQuery = query(favorites);

    getDocs(favoritesQuery)
      .then((querySnapshot) => {
        const items = [];
        querySnapshot?.forEach((doc) => {
          items.push(doc?.data());
        });
        setWatchlist(items);
      })
      .catch((err) => {
        console.log(err, "Error from firebase");
      });
  }, [user, uid, watchlistType]);

  const removeFromWatchList = async (itemID) => {
    try {
      if (!user) {
        console.log("No user found!");
        throw new Error("No user found!");
      }

      const userFavoritesCollection = collection(
        db,
        watchlistType,
        uid,
        "favourites"
      );
      const itemDocRef = doc(userFavoritesCollection, itemID);
      await deleteDoc(itemDocRef);

      const removedItemType = watchlistType === "movies" ? "Movie" : "TV show";

      toast({
        title: "Success",
        description: `${removedItemType} removed from Watchlist`,
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });

      const filteredWatchlist = watchlist?.filter(
        (item) => item?.id.toString() !== itemID.toString()
      );
      setWatchlist(filteredWatchlist);
    } catch (error) {
      console.log(error, "error removing item from watchlist");
    }
  };

  return (
    <Box mt="6">
      <Heading>Watchlist</Heading>
      <Button
        mt="4"
        colorScheme="teal"
        onClick={() => setWatchlistType(watchlistType === "movies" ? "tv" : "movies")}
      >
        {watchlistType === "movies" ? "Switch to TV Shows " : "Switch to Movie"}
      </Button>
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
          {watchlist?.map((item) => {
            return (
              <Box key={item?.id} position="relative">
                <Button
                  position="absolute"
                  color="white"
                  zIndex={"999"}
                  background={"red"}
                  right="0"
                  size="xs"
                  onClick={() => removeFromWatchList(item?.id?.toString())}
                >
                  Remove
                </Button>
                <CardComponent key={item?.id} item={item} type={watchlistType === "movies" ? "movie" : "tv"} />
              </Box>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default Watchlist;
