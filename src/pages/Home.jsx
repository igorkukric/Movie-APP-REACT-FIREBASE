import { useEffect, useState } from "react";
import { Box, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { getTrending } from "../services/api";
import CardComponent from "../components/CardComponent";

const Home = () => {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTrending()
      .then((res) => {
        // console.log(res, 'media')
        setMedia(res?.results);
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  console.log(media, "media");

  return (
    <Box mt="6">
      <Heading fontSize="2xl">Trending now</Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} mt="6">
        {media?.map((item) =>
          isLoading ? (
            <Skeleton
              key={item?.id}
              borderRadius={"lg"}
              background={"blackAlpha.300"}
              height={"300px"}
            />
          ) : (
            <CardComponent key={item?.id} item={item} />
          )
        )}
      </Grid>
    </Box>
  );
};

export default Home;
