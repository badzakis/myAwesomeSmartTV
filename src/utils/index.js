import { Utils, Router } from "@lightningjs/sdk";
import Card from "../components/SingleItem/SingleItem";
// import ChannelCard from "../components/ChannelItem/ChannelItem";
import HorizontalContainer from "../components/HorizontalContainer/HorizontalContainer";
import { CARD_SIZES, ROUTES_INDEX } from "../components/constants/constants";
import MovieItem from "../components/MovieItem/MovieItem";

export function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export const constructCardsArray = (array) => {
  return array.map((item) => {
    return {
      type: Card,
      props: {
        imageSrc: Utils.asset(item.image_src),
        itemTitle: item.item_title,
      },
      flexItem: {
        marginLeft: item.margin_left,
        marginRight: item.margin_right,
        marginTop: item.margin_top,
        marginBottom: item.margin_bottom,
      },
    };
  });
};

export const constructChannelArray = (array) => {
  return array.map((item) => {
    return {
      type: ChannelCard,
      props: {
        imageSrc: Utils.asset(item.image_src),
        itemTitle: item.item_title,
      },
      flexItem: {
        marginLeft: item.margin_left,
        marginRight: item.margin_right,
        marginTop: item.margin_top,
        marginBottom: item.margin_bottom,
      },
    };
  });
};

export const constructVerticalArray = (array) => {
  return array.map((item) => {
    return {
      type: HorizontalContainer,
      x: item.x,
      y: item.y,
      props: {
        collision: true,
        x: 50,
        y: 50,
        w: 1241,
        h: CARD_SIZES.FOCUSED_POSTER.height,
        paddingLeft: 100,
        railTitle: item.rail_title,
        items: constructCardsArray(item.card_array),
      },
    };
  });
};

export const constructMovieCardsArray = (array) => {
  return array.map((item, index) => {
    return {
      type: MovieItem,
      props: {
        imageSrc: item.image_src,
        itemTitle: item.item_title,
        index,
        id: item.id,
        callback: () => {
          Router.navigate(`details/${item.id}`);
        },
      },
      flexItem: {
        marginLeft: item.margin_left,
        marginRight: item.margin_right,
        marginTop: item.margin_top,
        marginBottom: item.margin_bottom,
      },
    };
  });
};

export const getRouteNavbarIndex = (route) => {
  if (route) {
    return ROUTES_INDEX[route] ?? 0;
  }
  return 0;
};
