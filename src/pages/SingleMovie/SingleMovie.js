import { Lightning, Colors, Utils } from "@lightningjs/sdk";
import BackBtn from "../../components/BackButton/BackButton";

export default class Movies extends Lightning.Component {
  static _template() {
    return {
      //   ...super.template(),
      collision: true,
      w: 1920,
      h: 1080,
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: Colors("#151515").get(),
      },

      SingleMovieDetails: {
        flex: {
          direction: "column",
        },
        y: 260,
        BackButton: {
          collision: true,
          type: BackBtn,
        },
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
        Poster: {
          x: 1400,
          y: -200,
          w: 100,
          h: 200,
        },
      },
    };
  }

  set props(props) {
    this._props = { ...this._props, ...props };

    const { title, description, imgSrc } = this._props;
    console.log(imgSrc);

    this.patch({
      SingleMovieDetails: {
        Title: {
          text: {
            text: title,
          },
        },
        Description: {
          text: {
            text: description,
          },
        },
        Poster: {
          src: imgSrc,
        },
      },
    });
  }

  get _MovieDetail() {
    return this.tag("SingleMovieDetails");
  }

  _getFocused() {
    return this.tag("BackButton");
  }
  //   _init() {
  //     console.warn(this._MovieDetail);
  //   }
}
