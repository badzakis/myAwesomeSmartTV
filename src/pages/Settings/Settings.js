import { Lightning, Utils, Router } from "@lightningjs/sdk";
import BackBtn from "../../components/BackButton/BackButton";
export default class Settings extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        src: Utils.asset("images/background.png"),
      },
      Label: { x: 200, y: 50, text: { text: "SETTINGS" } },
      BackButton: {
        collision: true,
        y: 50,
        x: 50,
        type: BackBtn,
      },
    };
  }

  _getFocused() {
    return this.tag("BackButton"); // default fokus na dugme
  }

  // enter na dugme → nazad na home
  _handleEnter() {
    Router.navigate("home");
    return true;
  }

  // back taster (na daljincu/escape) → isto kući
  _handleBack() {
    Router.navigate("home");
    return true;
  }
}
