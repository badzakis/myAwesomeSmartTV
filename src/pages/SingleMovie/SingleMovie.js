import { Lightning, Colors, Utils, Router } from "@lightningjs/sdk";
import BackBtn from "../../components/BackButton/BackButton";
import Button from "../../components/Button/Button";

export default class Movies extends Lightning.Component {
  static _template() {
    return {
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
        Button: {
          type: Button,
          collision: true,
          rect: true,
          x: 100,
          y: 157,
          w: 286,
          h: 78,
          props: {
            buttonIcon: Utils.asset("icons/play-button.svg"),
            iconWidth: 28,
            iconHeight: 28,
            color: Colors("#2F2F2F").get(),
            radius: 40,
            buttonLabel: "WATCH NOW",
            fontSize: 20,
            width: 286,
            h: 67,
            callback: () => {
              Router.navigate("player");
            },
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
        // color: Colors("#2F2F2F").get(),
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
  }

  get _MovieDetail() {
    return this.tag("SingleMovieDetails");
  }
  get _Background() {
    return this.tag("Background");
  }
  get _Button() {
    return this.tag("Button");
  }

  get _BackButton() {
    return this.tag("BackButton");
  }
  _firstActive() {
    this._setState("Button");
  }

  _active() {
    this._setState("Button");
  }
  static _states() {
    return [
      class Button extends this {
        _getFocused() {
          return this._Button;
        }

        _handleUp() {
          this._setState("BackButton");
        }
      },
      class BackButton extends this {
        _getFocused() {
          return this._BackButton;
        }

        _handleDown() {
          this._setState("Button");
        }
      },
    ];
  }
}
