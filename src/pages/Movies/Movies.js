import { Lightning, Utils } from "@lightningjs/sdk";
export default class Movies extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        src: Utils.asset("images/background.png"),
      },
      Label: { x: 400, y: 400, text: { text: "MOVIES" } },
    };
  }
}
