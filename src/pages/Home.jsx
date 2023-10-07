import React, { useEffect, useState, useRef } from "react";
import { Box, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { getTrending } from "../services/api";
import CardComponent from "../components/CardComponent";

const Home = () => {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  const loadedMediaIds = useRef(new Set());

  const loadMoreData = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    getTrending(page)
      .then((res) => {
        const newMedia = res?.results.filter((item) => {
          if (!loadedMediaIds.current.has(item.id)) {
            loadedMediaIds.current.add(item.id);
            return true;
          }
          return false;
        });
        setMedia((prevMedia) => [...prevMedia, ...newMedia]);
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);
  
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
      <Heading fontSize="2xl">Trending Now</Heading>
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
              key={`${item?.id}-${index}`}
              borderRadius={"lg"}
              background={"blackAlpha.300"}
              height={"300px"}
            />
          ) : (
            <CardComponent key={`${item?.id}-${index}`} item={item} type={item?.media_type} />
          )
        )}
      </Grid>
      <div ref={loaderRef} style={{ height: "20px" }}></div>
    </Box>
  );
};

export default Home;

