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
import { formatTimeHMS, playerButtonsVOD } from "./components/utils";
import HorizontalContainer from "../../components/HorizontalContainer/HorizontalContainer";

const states = ["Back", "Controls"];

export default class Player extends Lightning.Component {
  _videoSkipTimeSum = 10;
  _timeInterval;
  _props = {
    video_url: "",
    video_length: 0,
    current_time: 0,
  };

  _is_paused = false;
  _start_time_visible = new Date();
  _isPlaying = false;

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
        visible: false,
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
              type: HorizontalContainer,
              props: {
                items: playerButtonsVOD,
              },
            },
          },
        },
        ProgressWrapper: {
          y: 160,
          x: 100,
          zIndex: 2,
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
            y: 2,
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
  //!Controls on player (backward, play/pause, forward btns)
  get _Controls() {
    return this.tag("Controls");
  }

  //!Back button
  get _BackBtn() {
    return this.tag("BackButton");
  }

  //!Wraper
  get _Wrapper() {
    return this.tag("Wrapper");
  }
  //!Lifecycle event that gets called every time a component becomes active or visible
  _enable() {
    // VP position top 0, right 0
    VideoPlayer.position(0, 0);
    //VP Size (this case full screen)
    VideoPlayer.size(1920, 1080);
    //Defines which Lightning component is consuming media events that are emitted by the VideoPlayer plugin.
    VideoPlayer.consumer(this);
    // Stop and continue reproduction of video ragarding video quality. etc..
    VideoPlayer.loader(loader);
    VideoPlayer.unloader(unloader);
    //VP Loop
    VideoPlayer.loop(true);
    //VP open selected video
    VideoPlayer.open("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");

    //Set state to Controls
    this._setState("Controls");
    //on position 1 which is play/pause btn
    this._Controls._setFocusedIndex(1);

    //!Set interval for time in progress bar
    this._timeInterval = setInterval(() => {
      this.tag("CurrentTime").text = formatTimeHMS(VideoPlayer.currentTime);
      const endTime = new Date();
      var timeDiff = endTime - this._start_time_visible; //in ms
      // strip the ms
      timeDiff /= 1000;
      // get seconds
      var seconds = Math.round(timeDiff);
      if (seconds >= 10) {
        this._Wrapper.visible = false;
      }
      this._updateProgressBar();
      this.tag("ProgressBar")._Circle.patch({
        x: (VideoPlayer.currentTime / VideoPlayer.duration) * 1440,
      });
    }, 1000);
  }
  //! Helper za PLAY/PAUSE buttone
  _updatePlayPauseIcon() {
    const iconPath = this._isPlaying
      ? "icons/player/commands/pause.svg" // player radi → prikaži PAUSE
      : "icons/player/commands/play.svg"; // player stoji → prikaži PLAY

    this._Controls.Items.children[1]._Icon.patch({
      texture: lng.Tools.getSvgTexture(Utils.asset(iconPath), 90, 90),
    });
  }

  //!End time on progress bar
  $videoPlayerDurationChange() {
    this.tag("EndTime").text = formatTimeHMS(VideoPlayer.duration);
  }

  //!Play Video and change icon
  $playVideo() {
    this._isPlaying = true;
    VideoPlayer.play();
    this._updatePlayPauseIcon();
  }

  //!Pause video and change icon to play-icon
  $pauseVideo() {
    this._isPlaying = false;
    VideoPlayer.pause();
    this._updatePlayPauseIcon();
  }

  //!Exit video
  $exitVideo(e) {
    if (this._Wrapper.visible) {
      if ((Router.getHistory()?.length ?? 0) === 0) {
        Router.navigate("home");
      } else {
        this._handleBack(e);
      }
    }
  }

  //!Skip video backward -10s, forward +10s
  $skippingTime(forward) {
    this._skipVideo(forward);
  }

  //! SMTH Related to PlayerButton.js component ???? < =============================
  $startStopVideo(isStopped) {
    this._setState("Controls");
    if (this._Wrapper.visible) {
      this.$pauseVideo();
    }
  }

  //!Some hover state hover
  $handleStateHover(index) {
    this._setState(states[index]);
  }

  //! SKIP METHOD USED IN $skippingTime
  _skipVideo(forward) {
    if (forward) {
      this._videoSkipTimeSum = 10;
    } else {
      this._videoSkipTimeSum = -10;
    }

    this._Wrapper.visible = true;
    this._start_time_visible = new Date();

    VideoPlayer.skip(this._videoSkipTimeSum);

    this.tag("ProgressBar")._Circle.patch({
      x: (VideoPlayer.currentTime / VideoPlayer.duration) * 1440,
    });

    this._updateProgressBar();
  }

  //!Update progress bar
  _updateProgressBar() {
    const currentTime = Math.max(
      0,
      Math.min(VideoPlayer.currentTime, VideoPlayer.duration)
    );
    const progress = currentTime / VideoPlayer.duration;
    this.tag("ProgressBar")._ProgressBar.progress = progress;
    this.tag("CurrentTime").text = formatTimeHMS(currentTime);
  }

  //! handle used in $exitVideo
  _handleBack() {
    VideoPlayer.clear();
    VideoPlayer.close();
    clearInterval(this._timeInterval);

    Router.back();
  }

  //! HANDLES UP - LEFT - RIGHT - BOTTOM

  //Handle UP
  _handleUp() {
    if (VideoPlayer.playing) {
      this._setState("Controls");
      this._isPlaying = true;
      this._updatePlayPauseIcon();
    } else {
      this._setState("Controls");
      this._isPlaying = false;
      this._updatePlayPauseIcon();
    }
  }
  //Handle left
  _handleLeft() {
    this._Wrapper.visible = true;
    this._start_time_visible = new Date();
  }
  //Handle Right
  _handleRight() {
    this._Wrapper.visible = true;
    this._start_time_visible = new Date();
  }
  //Handle Down
  _handleDown() {
    this._Wrapper.visible = true;
    this._start_time_visible = new Date();
  }

  //!Handle Enter
  $handleEnter() {
    this._Wrapper.visible = true;
    this._start_time_visible = new Date();
  }

  //! When u have _enable, after loop ends u need also _DISABLE
  _disable() {
    VideoPlayer.clear();
    VideoPlayer.close();

    clearInterval(this._timeInterval);
  }

  //! I assume that is default state is in Controls
  $videoPlayerLoadedData() {
    this._setState("Controls");
  }

  //! ------------- STATES HANDLERS --------------
  static _states() {
    return [
      class Controls extends this {
        _getFocused() {
          return this._Controls;
        }

        _handleLeft() {
          this._setState("Back");
          this._Wrapper.visible = true;
          this._start_time_visible = new Date();
        }

        // _handleDown() {
        //   console.log("Controls > ProgressBar");
        //   if (this.tag("Wrapper").visible) {
        //     console.log("VIDLJIVO JE!!");
        //   } else {
        //     if (VideoPlayer.playing) {
        //       console.log(
        //         "NIJE VIDLJIVO, PLAYER RADI I TREBA DA IMA PAUZA IKONU"
        //       );
        //       this._Controls.Items.children[1]._Icon.patch({
        //         texture: lng.Tools.getSvgTexture(
        //           Utils.asset("icons/player/commands/pause.svg"),
        //           90,
        //           90
        //         ),
        //       });
        //     } else {
        //       console.log(
        //         "NIJE VIDLJIVO, PLAYER NE RADI I TREBA DA IMA PLAY IKONU"
        //       );
        //       this._Controls.Items.children[1]._Icon.patch({
        //         texture: lng.Tools.getSvgTexture(
        //           Utils.asset("icons/player/commands/play.svg"),
        //           90,
        //           90
        //         ),
        //       });
        //     }
        //   }

        //   this._setState("ProgressBar");
        //   this._Wrapper.visible = true;
        //   this._start_time_visible = new Date();
        // }

        _handleDown() {
          console.log("Controls > ProgressBar");
          this.tag("Wrapper").visible = !this.tag("Wrapper").visible;

          if (this.tag("Wrapper").visible) {
            this._setState("ProgressBar");
            this._updatePlayPauseIcon();
            this._start_time_visible = new Date();
          } else {
            this._setState("ProgressBar");
          }
        }

        _handleUp() {
          this.tag("Wrapper").visible = !this.tag("Wrapper").visible;

          if (this.tag("Wrapper").visible) {
            this._setState("Controls");
            this._updatePlayPauseIcon();
            this._start_time_visible = new Date();
          }
        }
      },

      class ProgressBar extends this {
        _getFocused() {
          return this.tag("ProgressBar");
        }

        _handleLeft() {
          this._skipVideo(false);
        }

        _handleRight() {
          this._skipVideo(true);
        }

        _handleUp() {
          this._setState("Controls");
        }

        _handleEnter() {
          const wasPlaying = this._isPlaying; // state BEFORE CLICK

          if (wasPlaying) {
            this.$pauseVideo();
          } else {
            this.$playVideo();
            this.tag("Wrapper").visible = true;
            this._start_time_visible = new Date();
          }
        }
      },

      class Back extends this {
        _getFocused() {
          return this.tag("BackButton");
        }

        _handleRight() {
          this._setState("Controls");
          this._Wrapper.visible = true;
          this._start_time_visible = new Date();
        }

        _handleDown() {
          console.log("Back > ProgressBar");

          this._setState("ProgressBar");
          this._Wrapper.visible = true;
          this._start_time_visible = new Date();
        }
      },
    ];
  }
}
