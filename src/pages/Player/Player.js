import lng from "@lightningjs/core";
import {
  Lightning,
  VideoPlayer,
  Utils,
  Router,
  Colors,
} from "@lightningjs/sdk";
import PlayerButtons from "./components/PlayerButtons/PlayerButtons";
import { loader, unloader } from "../../components/Player/HLS";
import ProgressBarWrapper from "./components/ProgressBar/ProgressBar";
import colors from "../../../reskin/colors.json";
import Row from "../../components/Row/Row";
import { formatTimeHMS, playerButtonsVOD } from "./components/utils";

const states = ["Back", "Controls"];

export default class Player extends Lightning.Component {
  _enable() {
    VideoPlayer.position(0, 0);
    VideoPlayer.size(1920, 1080);
    VideoPlayer.consumer(this);
    VideoPlayer.loader(loader);
    VideoPlayer.unloader(unloader);
    VideoPlayer.loop(true);
    const videoUrl = "https://assets.afcdn.com/video49/20210722/v_645516.m3u8";
    VideoPlayer.open(videoUrl);

    this._setState("Back");
    // this._BackButton.setFocusedIndex(1);
  }

  static _template() {
    const superTemplate = super._template ? super._template() : {}; //check if there is parent
    return {
      ...superTemplate, //parent poziva parent static._template() metodu i dobija objekat
      w: 1920,
      h: 1080,
      x: 0,
      y: 0,
      Wrapper: {
        h: 156,
        w: 1690,
        x: 0,
        y: 800,
        vissible: false,
        Shadow: {
          zIndex: 1,
          colorTop: Colors("#000000").alpha(0).get(),
          colorBottom: Colors("#000000").alpha(0.8).get(),
          texture: lng.Tools.getShadowRect(1920, 280, 0, 0, 0),
        },
        ControlsContainer: {
          // kontrole na player-u
          x: 115,
          y: 36,
          zIndex: 2,
          flex: {
            direction: "column",
          },
          ControlWrapper: {
            flex: {
              direction: "column",
            },
            BackButton: {
              collision: true,
              type: PlayerButtons,
              props: {
                buttonInfo: {
                  label: "back",
                  icon: `icons/player/commands/back.svg`,
                  onLiveContent: true,
                  position: 60,
                },
              },
            },
            // Controls: {
            //   collision: true,
            //   x: 617,
            //   type: Row,
            //   props: {
            //     items: playerButtonsVOD,
            //   },
            // },
            ProgressWrapper: {
              collision: true,
              flex: {
                direction: "row",
                alignItems: "center",
                justifyContent: "center",
              },
              CurrentTime: {
                w: 119,
                h: 31,
                text: {
                  fontSize: 26,
                  fontFace: "Montserrat-Bold",
                  lineHeight: 31,
                  maxLines: 1,
                  textColor: Colors("#FFFFFF").alpha(0.6).get(),
                },
              },
              ProgressBar: {
                type: ProgressBarWrapper,
                x: 30,
                w: 1404,
                h: 9,
                props: {
                  marginLeft: 20,
                  marginRight: 20,
                  width: 1404,
                  height: 9,
                  progressColor: Colors(colors.focus).get(),
                },
              },
              EndTime: {
                w: 119,
                h: 31,
                x: 60,
                text: {
                  fontSize: 26,
                  fontFace: "Montserrat-Bold",
                  lineHeight: 31,
                  maxLines: 1,
                  textColor: Colors("#FFFFFF").alpha(0.6).get(),
                },
              },
            },
          },
        },
      },
    };
  }
  get _BackButton() {
    return this.tag("BackButton");
  }

  _disable() {
    VideoPlayer.clear();
    VideoPlayer.close();
    clearInterval(this._timeInterval);
  }
  _handleBack() {
    VideoPlayer.clear();
    VideoPlayer.close();

    clearInterval(this._timeInterval);

    Router.back();
  }

  static _states() {
    return [
      class Back extends this {
        _getFocused() {
          return this.tag("BackButton");
        }
      },
    ];
  }
  $exitVideo(e) {
    if (this.tag("Wrapper").visible) {
      this._handleBack(e);
    }
  }
}
