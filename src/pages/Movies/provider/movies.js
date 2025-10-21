export default async function (page) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.APP_AUTH_KEY_TMDB}`,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
    options
  );
  const movies = (await response.json()).results.slice(0, 5);

  page.props = {
    movieList: movies.map((item) => {
      return {
        image_src: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        item_title: item.original_title,
        margin_left: 12,
        margin_right: 12,
        margin_top: 10,
        margin_bottom: 10,
        title: item.original_title,
        description: item.overview,
        trailer_src: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        id: item.id,
      };
    }),
  };
}
