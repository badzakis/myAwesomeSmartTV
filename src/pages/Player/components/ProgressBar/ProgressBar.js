import { Lightning, Colors } from "@lightningjs/sdk";
import { ProgressBar } from "@lightningjs/ui-components";
import lng from "@lightningjs/core";

import colors from "../../../../../reskin/colors.json";

export default class ProgressBarWrapper extends Lightning.Component {
  _props = {};

  static _template() {
    return {
      ...super._template(),
      FocusBorder: {
        x: -2,
        y: -2,
        zIndex: 100,
      },
      Circle: {
        y: -9,
        zIndex: 100,
        rect: true,
      },
      ProgressBar: {
        type: ProgressBar,
      },
    };
  }

  get _FocusBorder() {
    return this.tag("FocusBorder");
  }

  get _ProgressBar() {
    return this.tag("ProgressBar");
  }

  get _Circle() {
    return this.tag("Circle");
  }

  set props(props) {
    this._props = { ...this._props, ...props };

    const { marginLeft, marginRight, width, height, progressColor } = props;

    this._ProgressBar.patch({
      flexItem: {
        marginLeft,
        marginRight,
      },
      w: width,
      h: height,
      style: {
        progressColor,
      },
    });
  }

  _focus() {
    const { width, height } = this._props;
    this._FocusBorder.patch({
      texture: lng.Tools.getRoundRect(
        width,
        height,
        0,
        2,
        Colors(colors.focus).get(),
        false
      ),
    });
    this._Circle.patch({
      mountX: 0.8,
      texture: lng.Tools.getRoundRect(
        21,
        21,
        10,
        3,
        Colors("#ffffff").get(),
        true,
        Colors(colors.focus).get()
      ),
    });
  }

  _unfocus() {
    this._FocusBorder.patch({
      texture: null,
    });
    this._Circle.patch({
      texture: null,
    });
  }
}
