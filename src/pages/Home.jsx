import React, { useEffect, useState, useRef } from "react";
import { Box, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { getTrending } from "../services/api";
import CardComponent from "../components/CardComponent";

const Home = () => {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);  // Current page number
  const loaderRef = useRef(null);  // Ref for the loader element

  const loadMoreData = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    getTrending(page)  // Fetch trending items for the current page
      .then((res) => {
        setMedia((prevMedia) => [...prevMedia, ...res?.results]);  // Append new items to the existing list
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  // Use IntersectionObserver to load more data when user scrolls to the loader element
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadMoreData();
      }
    }, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  return (
    <Box mt="6">
      <Heading fontSize="2xl">Trending now</Heading>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={6}
        mt="6"
      >
        {media?.map((item, index) =>
          isLoading && index === media.length - 1 ? (
            <Skeleton
              key={item?.id}
              borderRadius={"lg"}
              background={"blackAlpha.300"}
              height={"300px"}
            />
          ) : (
            <CardComponent key={item?.id} item={item} type={item?.media_type} />
          )
        )}
      </Grid>
      <div ref={loaderRef} style={{ height: "20px" }}></div>
    </Box>
  );
};

export default Home;

