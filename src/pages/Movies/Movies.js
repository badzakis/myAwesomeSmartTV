import { Lightning, Utils, Colors, Router } from "@lightningjs/sdk";
import Row from "../../components/Row/Row";
import PosterCard from "../../components/PosterCard/PosterCard";

export default class Movies extends Lightning.Component {
  static _template() {
    return {
      Label: { x: 50, y: 150, text: { text: "MOVIES" } },
      collision: true,
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: Colors("#222351").get(),
      },
      MovieBg: {
        rect: true,
        w: 1920,
        h: 620,
        colorRight: Colors("#737481").get(),
        colorLeft: Colors("#737481").get(),
        colorTop: Colors("#737481").get(),
        colorBottom: Colors("#737481").get(),
      },
      Details: {
        flex: {
          direction: "column",
        },
        y: 260,
        Title: {
          text: {
            fontSize: 28,
            lineHeight: 30,
            textColor: Colors("#FFFFFF").get(),
          },
        },
        Description: {
          x: 50,
          text: {
            fontSize: 22,
            lineHeight: 31,
            wordWrapWidth: 698,
            textColor: Colors("#FFFFFF").get(),
          },
        },
      },
      MoviesList: {
        type: Row,
        x: 50,
        y: 620,
      },
    };
  }

  _init() {
    this._rows = [this.tag("Movieslist")];
    this._rowIndex = 0;
    this._zone = "content"; // 'content' | 'sidebar'
    this._lastRowIndex = 0;
  }
  set props(props) {
    this._props = { ...this._props, ...props };

    this._MovieList.patch({
      props: {
        h: 302,
        w: 1792,
        items: this._props.movieList.map((item, i) => ({
          type: PosterCard,
          x: 20 + i * (220 + 10),
          item,
          props: {
            width: 200,
            height: 300,
            imageSrc: item.image_src,
            title: item.title,
            trailerSrc: item.trailer_src,
            description: item.description,
            itemId: item.id,
          },
        })),
      },
    });
  }

  $focusRowUp() {
    if (this._zone !== "content") return true;
    if (this._rowIndex === 0) Router.focusWidget("Menu");
    else {
      this._rowIndex--;
    }
    return true;
  }
  get _MovieBg() {
    return this.tag("MovieBg");
  }

  get _Title() {
    return this.tag("Title");
  }
  get _Description() {
    return this.tag("Description");
  }
  get _MovieList() {
    return this.tag("MoviesList");
  }

  $changeBackground(src, desc) {
    this._MovieBg.patch({
      src,
    });
    this._Description.patch({
      text: {
        text: desc,
      },
    });
  }

  _getFocused() {
    return this._MovieList;
  }
}
