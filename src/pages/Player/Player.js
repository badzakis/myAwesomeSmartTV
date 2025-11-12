import { Lightning, VideoPlayer, Utils } from "@lightningjs/sdk";
import PlayerButtons from "./components/PlayerButtons/PlayerButtons";

export default class Player extends Lightning.Component {
  _enable() {
    VideoPlayer.position(0, 0);
    VideoPlayer.size(1920, 1080);
    VideoPlayer.consumer(this);
    // VideoPlayer.loader(loader);
    // VideoPlayer.unloader(unloader);
    VideoPlayer.loop(false);
    const videoUrl = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
    VideoPlayer.open(videoUrl);
  }

  static _template() {
    const superTemplate = super._template ? super._template() : {}; //check if there is parent
    return {
      ...superTemplate, //parent poziva parent static._template() metodu i dobija objekat
      w: 1920,
      h: 1080,
      x: 0,
      y: 800,
      visible: false,
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
        },
      },
    };
  }
  _disable() {
    VideoPlayer.clear();
    VideoPlayer.close();

    clearInterval(this._timeInterval);
  }
}
