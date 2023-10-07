import { useEffect, useState } from "react";
import { Box, Grid, Heading, Skeleton, useMediaQuery } from "@chakra-ui/react";
import { getTvShows } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import Pagination from "../../components/Pagination";

const Shows = () => {
  const [tv, setTv] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");
  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");

  useEffect(() => {
    setIsLoading(true);
    getTvShows(activePage)
      .then((res) => {
        setTv(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activePage]);

  const getColumnCount = () => {
    if (isLargerThanLG) return 5;
    if (isLargerThanMD) return 3;
    return 1;
  };

  return (
    <Box mt="6">
      <Heading fontSize="2xl">Discover TV Shows</Heading>
      <Grid
        templateColumns={`repeat(${getColumnCount()}, 1fr)`}
        gap={6}
        mt="6"
      >
        {tv?.map((tvShow) =>
          isLoading ? (
            <Skeleton
              key={tvShow?.id}
              borderRadius={"lg"}
              background={"blackAlpha.300"}
              height={"300px"}
            />
          ) : (
            <CardComponent key={tvShow?.id} item={tvShow} type={"tv"} />
          )
        )}
      </Grid>

      <Pagination
        currentPage={activePage}
        setCurrentPage={setActivePage}
        totalPages={totalPages}
      />
    </Box>
  );
};

export default Shows;


