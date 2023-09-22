import axios from "axios";

const apiUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

export const imagePath = "https://image.tmdb.org/t/p/w500";

// TRENDING

export const getTrending = async (page = 1) => {
  const res = await axios.get(
    `${apiUrl}/trending/all/day?api_key=${apiKey}&page=${page}`
  );
  return res?.data;
};

// Movies

export const getMovies = async (page = 1) => {
  const res = await axios.get(
    `${apiUrl}/discover/movie?api_key=${apiKey}&page=${page}`
  );
  return res?.data;
};

// Series

export const getTvShows = async (page = 1) => {
  const res = await axios.get(
    `${apiUrl}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=vote_count.desc`
  );
  return res?.data;
};

export const getDetails = async (mediaType, id) => {
  const res = await axios.get(`${apiUrl}/${mediaType}/${id}?api_key=${apiKey}`);
  return res?.data;
};
