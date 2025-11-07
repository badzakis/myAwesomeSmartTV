import lng from "@lightningjs/core";
import { Colors, Lightning, Router, Utils } from "@lightningjs/sdk";
import colors from "../../../reskin/colors.json";

export default class BackBtn extends Lightning.Component {
  static _template() {
    return {
      collision: true,
      h: 64,
      w: 112,
      Background: {
        rect: true,
        h: 64,
        w: 112,
        color: Colors("#2F2F2F").get(),
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 30,
        },
      },
      Icon: {
        rect: true,
        x: 32,
        y: 8,
        color: Colors("#ffffff").get(),
        texture: Lightning.Tools.getSvgTexture(
          Utils.asset("/backbtn.svg"),
          48,
          48
        ),
      },
    };
  }

  get _Background() {
    return this.tag("Background");
  }

  get _Icon() {
    return this.tag("Icon");
  }

  _focus() {
    this._Background.patch({
      color: Colors(colors.focus).get(),
    });
  }

  _unfocus() {
    this._Background.patch({
      color: Colors("#2F2F2F").get(),
    });
  }

  _handleEnter() {
    if ((Router.getHistory()?.length ?? 0) === 0) {
      Router.navigate("home");
    } else {
      Router.back();
    }
  }

  _handleClick() {
    Router.back();
  }
}
