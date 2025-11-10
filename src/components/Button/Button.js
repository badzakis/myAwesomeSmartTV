import { Colors, Lightning } from "@lightningjs/sdk";
import colors from "../../../reskin/colors.json";
export default class Button extends Lightning.Component {
  _isFocused = false;
  _props = {
    width: 285,
    height: 78,
    buttonLabel: "",
    buttonIcon: "",
    iconWidth: 25,
    iconHeight: 25,
    radius: 0,
    strokeWidth: 4,
  };
  static _template() {
    return {
      rect: true,
      flex: { direction: "row", alignItems: "center" },
      Icon: {
        x: 50,
      },
      Label: {
        x: 60,
        h: 25,
        color: Colors(this._isFocused ? Colors.focus : Colors.unfocus).get(),
        Text: {
          text: {
            fontFace: "Montserrant-Bold",
            letterSpacing: 2,
          },
        },
      },
    };
  }

  set props(props) {
    this._props = { ...this._props, ...props };

    const {
      width,
      height,
      buttonLabel,
      fontSize,
      buttonIcon,
      iconWidth,
      iconHeight,
      radius,
      borderColor,
      enabled,
    } = this._props;

    this.patch({
      w: width,
      h: height,
      color: Colors(colors.focusDisabled).get(),
      shader: {
        type: Lightning.shaders.RoundedRectangle,
        radius,
      },
      Icon: {
        texture: lng.Tools.getSvgTexture(buttonIcon, iconWidth, iconHeight),
      },
      Label: {
        Text: {
          text: {
            text: buttonLabel,
            fontSize: fontSize,
          },
        },
      },
    });

    const colorBorder = borderColor ? borderColor : colors.unfocus;

    if (buttonIcon === "") {
      this._Label.patch({
        w: width,
        flex: {
          direction: "row",
          alignItems: "center",
          justifyContent: "center",
        },
        x: 0,
      });
    }
    let focusingColors;
    let fillColor;

    if (enabled) {
      focusingColors = Colors(
        this._isFocused ? colors.focus : colorBorder
      ).get();
      fillColor = Colors(colors.focus).get();
    }

    if (!enabled) {
      focusingColors = Colors(
        this._isFocused ? colors.focusDisabled : colors.unfocusDisabled
      ).get();
      fillColor = Colors(colors.focusDisabled).get();
    }
  }

  get _Label() {
    return this.tag("Label");
  }
  get _Icon() {
    return this.tag("Icon");
  }
  get _Text() {
    return this.tag("Label").tag("Text");
  }

  _focus() {
    this._isFocused = true;
    this.patch({
      color: Colors(colors.focus).get(),
    });
    this.fireAncestors("$setFocusedItem", this);
  }

  _unfocus() {
    this._isFocused = false;
    this.patch({
      color: Colors(colors.focusDisabled).get(),
    });
  }

  _disable() {
    this._props.enabled = true;
  }

  _handleEnter() {
    const { callback } = this._props;
    callback();
  }
}
