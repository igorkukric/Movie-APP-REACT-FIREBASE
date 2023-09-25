import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Movies from "./pages/movies/Movies";
import Shows from "./pages/shows/Shows";
import Search from "./pages/Search";
import MovieDetails from "./pages/movies/MovieDetails";
import ShowDetails from "./pages/shows/ShowDetails";
import { AuthProvider } from './context/useAuth'

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element= {<MovieDetails />} />
          <Route path="/tv/:id" element= {<ShowDetails />} />
        </Routes>
      </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
