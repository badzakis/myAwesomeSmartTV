import Home from "../pages/Home/Home.js";
import Live from "../pages/Live/Live.js";
import Movies from "../pages/Movies/Movies.js";
import movies from "../pages/Movies/provider/movies.js";
import Settings from "../pages/Settings/Settings.js";
import SingleMovie from "../pages/SingleMovie/SingleMovie.js";
import singleMovie from "../pages/SingleMovie/provider/singlemovie.js";
import Player from "../pages/Player/Player.js";

export default {
  root: "home",
  routes: [
    { path: "home", component: Home, widgets: ["Menu"] },
    { path: "live", component: Live, widgets: ["Menu"] },
    { path: "movies", component: Movies, widgets: ["Menu"], on: movies },
    { path: "settings", component: Settings },
    { path: "details/:movieId", component: SingleMovie, on: singleMovie },
    {
      path: "player",
      component: Player,
    },
  ],
};
