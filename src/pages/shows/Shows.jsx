import { useEffect, useState } from "react";
import { Box, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { getTvShows } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import Pagination from "../../components/Pagination";

const Shows = () => {
  const [tv, setTv] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getTvShows(activePage)
      .then((res) => {
        // console.log(res, "media");
        setTv(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activePage]);

  return (
    <Box mt="6">
      <Heading fontSize="2xl">Discover tv shows</Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} mt="6">
        {tv?.map((tv) =>
          isLoading ? (
            <Skeleton
              key={tv?.id}
              borderRadius={"lg"}
              bg="blackAlpha.300"
              height={"300px"}
            />
          ) : (
            <CardComponent key={tv?.id} item={tv} type='tv' />
          )
        )}
      </Grid>

      {/* Pagination */}
      <Pagination
        currentPage={activePage}
        setCurrentPage={setActivePage}
        totalPages={totalPages}
      />
    </Box>
  );
};

export default Shows;

