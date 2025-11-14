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
    VideoPlayer.loop(false);
    const videoUrl = "https://assets.afcdn.com/video49/20210722/v_645516.m3u8";
    VideoPlayer.open(videoUrl);

    this._setState("Back");
  }

  static _template() {
    const superTemplate = super._template ? super._template() : {};
    return {
      ...superTemplate,
      w: 1920,
      h: 1080,
      x: 0,
      y: 0,
      Wrapper: {
        h: 156,
        w: 1690,
        x: 0,
        y: 800,
        // visible: false,
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
              direction: "row",
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
            Controls: {
              collision: true,
              x: 580,
              type: Row,
              props: {
                items: playerButtonsVOD.map((btn, index) => ({
                  ...btn,
                  x: index * 100,
                })),
              },
            },
          },
        },
        ProgressWrapper: {
          y: 160,
          x: 60,
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
    };
  }
  $videoPlayerPlaying() {
    console.log(this._Controls);
    this._Controls.children[1].changeIcon("icons/player/commands/pause.svg");
  }
  get _BackButton() {
    return this.tag("BackButton");
  }
  get _Controls() {
    return this.tag("Controls");
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
        _enter() {
          console.log("ENTER STATE: Back");
          // čisto da vizuelno vidiš promenu
          this._BackButton.alpha = 1;
          this._Controls.alpha = 0.5;
        }

        _getFocused() {
          return this._BackButton;
        }

        _handleRight() {
          console.log("Back: RIGHT pressed -> go to Controls");
          this._setState("Controls");
        }
      },

      class Controls extends this {
        _enter() {
          console.log("ENTER STATE: Controls");
          this._BackButton.alpha = 0.5;
          this._Controls.alpha = 1;
        }

        _getFocused() {
          return this._Controls;
        }

        _handleLeft() {
          console.log("Controls: LEFT pressed -> go to Back");
          this._setState("Back");
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
