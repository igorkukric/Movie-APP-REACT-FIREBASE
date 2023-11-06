import React from "react";
import { AspectRatio } from "@chakra-ui/react";

const VideoComponent = ({ id }) => {
  return (
    <AspectRatio ratio={2}>
    <iframe
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />

</AspectRatio>
  );
};

export default VideoComponent;
