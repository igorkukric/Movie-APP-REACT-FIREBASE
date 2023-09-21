import { useEffect, useState } from "react";
import { Box, Grid, Heading, Image, Text } from "@chakra-ui/react";
import { getTrending, imagePath } from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    getTrending()
      .then((res) => {
        // console.log(res, 'media')
        setMedia(res?.results);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

  console.log(media, "media");

  return (
    <Box mt="6">
      <Heading fontSize="2xl">Trending now</Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} mt="6">
        {media?.map((item) => (
          <Link key={item?.id}>
            <Box borderRadius={"lg"} background="blackAlpha.300">
              <Image
                src={`${imagePath}/${item?.backdrop_path}`}
                borderRadius={"lg"}
                objectFit={"cover"}
                width={"full"}
                height={"300px"}
              />
              <Box p="2">
                <Text fontSize="sm" textAlign="center">
                  {" "}
                  {item.title || item?.name}{" "}
                </Text>
              </Box>
            </Box>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
