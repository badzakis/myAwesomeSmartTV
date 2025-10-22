export default async function (page, { movieId }) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.APP_AUTH_KEY_TMDB}`,
    },
  };

  const result = await (
    await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      options
    )
  ).json();
  let genre = "";
  result.genres.forEach((item) => {
    genre += item.name + ", ";
  });

  //   const movie = {
  //     genre: genre.substring(0, genre.length - 2),
  //     length: `${result.runtime} minutes`,
  //     movie_info: "US - 1987 - PG - IMDb: 7.7",
  //     movie_title: result.original_title,
  //     movie_description: result.overview,
  //     director: "Enzo G. Castellari",
  //     cast: "Enzo G. Castellari, Enzo G. Castellari, Enzo G. Castellari, Enzo G. Castellari",
  //     image_src: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
  //   };

  page.props = {
    title: result.original_title,
    description: result.overview,
    imgSrc: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
  };
}
