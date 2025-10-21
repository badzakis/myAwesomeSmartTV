import Home from "../pages/Home.js";
import Live from "../pages/Live.js";
import Movies from "../pages/Movies/Movies.js";
import Settings from "../pages/Settings.js";

export default {
  root: "home",
  routes: [
    { path: "home", component: Home, widgets: ["Menu"] },
    { path: "live", component: Live, widgets: ["Menu"] },
    { path: "movies", component: Movies, widgets: ["Menu"] },
    { path: "settings", component: Settings },
  ],
};
