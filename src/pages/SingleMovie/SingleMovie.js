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
          y: -200,
          x: 100,
          collision: true,
          type: BackBtn,
        },
        Title: {
          y: -100,
          x: 100,
          text: {
            fontSize: 44,
            lineHeight: 30,
            textColor: Colors("#FFFFFF").get(),
          },
        },
        Description: {
          y: -50,
          x: 100,
          text: {
            fontSize: 28,
            lineHeight: 31,
            wordWrapWidth: 698,
            textColor: Colors("#FFFFFF").get(),
          },
        },
        Poster: {
          x: 1080,
          y: -720,
          w: 460,
          h: 770,
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
