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
      },
      Shadow: {
        zIndex: 1,
        colorTop: Colors("#121313").alpha(0).get(),
        colorBottom: Colors("#121313").alpha(0).get(),
        colorLeft: Colors("#121313").alpha(0.8).get(),
        texture: lng.Tools.getShadowRect(1920, 1080, 0, 0, 0),
      },

      SingleMovieDetails: {
        zIndex: 1,
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
        WatchNowBtn: {
          x: 100,
          y: 150,
          text: {
            text: "WATCH NOW >",
            fontSize: 28,
            lineHeight: 31,
            wordWrapWidth: 698,
            textColor: Colors("#FFFFFF").get(),
          },
        },
      },
    };
  }

  set props(props) {
    this._props = { ...this._props, ...props };

    const { title, description, imgSrc } = this._props;

    this.patch({
      Background: {
        w: 960,
        x: 960,
        h: 1080,
        src: imgSrc,
      },
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
      },
    });
    //   w: 960,
    //   h: 1080,

    //   src: imgSrc,
    // });
  }

  get _MovieDetail() {
    return this.tag("SingleMovieDetails");
  }
  get _Background() {
    return this.tag("Background");
  }

  _getFocused() {
    return this.tag("BackButton");
  }
}
