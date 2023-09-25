import React from "react";

const VideoComponent = ({ id }) => {
  return (
    <iframe
      width="100%"
      height="500"
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
};

export default VideoComponent;
