import { Utils, Lightning } from "@lightningjs/sdk";
import { Colors } from "@lightningjs/sdk";

import colors from "../../../reskin/colors.json";
import { CARD_SIZES } from "../constants/constants";
import Image from "../MovieItem/MovieItem";

export default class Card extends Lightning.Component {
  _props = {
    width: 0,
    height: 0,
    imageSrc: "",
    placeholderSrc: Utils.asset("images/logo.png"),
    radius: 6,
    strokeWidth: 6,
    callback: () => null,
  };
  static _template() {
    return {
      ...super._template(),
      w: CARD_SIZES.POSTER.width,
      h: CARD_SIZES.POSTER.height,
      x: 0,
      y: 0,
      collision: true,
      Wrapper: {
        flex: { direction: "column" },
        Border: {
          flex: { justifyContent: "center", alignItems: "center" },
          PosterImage: {
            type: Image,
          },
        },
        Title: {
          y: 15,
          h: 43,
          w: 229,
          text: {
            text: "Title",
            fontSize: 24,
            fontFace: "Montserrat-Regular",
            lineHeight: 24,
            maxLines: 1,
            wordWrapWidth: 229,
            maxLinesSuffix: "...",
            textColor: Colors("#FFFFFF").alpha(0.6).get(),
          },
        },
      },
      FocusBorder: {
        x: -2,
        y: -2,
        zIndex: 100,
      },
    };
  }

  get _Title() {
    return this.tag("Title");
  }

  get _PosterImage() {
    return this.tag("PosterImage");
  }

  get _FocusBorder() {
    return this.tag("FocusBorder");
  }

  set props(props) {
    this._props = { ...this._props, ...props };
    const {
      imageSrc,
      radius,
      itemTitle,
      placeholderSrc,
      index,
      width,
      height,
    } = this._props;

    this.setProps({
      width: CARD_SIZES.POSTER.image_width,
      height: CARD_SIZES.POSTER.image_height,
    });

    this._Title.patch({
      text: {
        text: itemTitle,
      },
    });

    this._PosterImage.patch({
      props: {
        width: CARD_SIZES.POSTER.image_width,
        height: CARD_SIZES.POSTER.image_height,
        imageSrc: imageSrc,
        placeholderSrc: placeholderSrc,
        radius: radius,
      },
    });
  }

  _focus() {
    const { radius, strokeWidth, width } = this._props;

    this.patch({
      h: CARD_SIZES.FOCUSED_POSTER.height,
      y:
        (CARD_SIZES.POSTER.height - CARD_SIZES.FOCUSED_POSTER.height) / 2 -
        strokeWidth,
    });

    this._Title.patch({
      text: {
        textColor: Colors("#FFFFFF").get(),
        fontFace: "Montserrat-SemiBold",
      },
    });

    this._PosterImage.patch({
      props: {
        width: CARD_SIZES.FOCUSED_POSTER.image_width,
        height: CARD_SIZES.FOCUSED_POSTER.image_height,
      },
    });

    this._FocusBorder.patch({
      texture: lng.Tools.getRoundRect(
        CARD_SIZES.FOCUSED_POSTER.image_width,
        CARD_SIZES.FOCUSED_POSTER.image_height,
        radius,
        strokeWidth,
        Colors(colors.focus).get(),
        false
      ),
      ShadowLeft: {
        x: -30,
        y: 0,
        zIndex: 1,
        color: Colors("#151515").get(),
        texture: lng.Tools.getShadowRect(
          30,
          CARD_SIZES.FOCUSED_POSTER.height,
          radius,
          30,
          0
        ),
      },
      ShadowRight: {
        x: width,
        y: 0,
        zIndex: 1,
        color: Colors("#151515").get(),
        texture: lng.Tools.getShadowRect(
          30,
          CARD_SIZES.FOCUSED_POSTER.height,
          radius,
          30,
          20
        ),
      },
    });

    this.fireAncestors("$setFocusedItem", this);
  }

  _unfocus() {
    this.patch({
      w: CARD_SIZES.POSTER.width,
      h: CARD_SIZES.POSTER.height,
      y: 0,
    });

    this._Title.patch({
      text: {
        textColor: Colors("#FFFFFF").alpha(0.6).get(),
        fontFace: "Montserrat-Regular",
      },
    });

    this._PosterImage.patch({
      props: {
        width: CARD_SIZES.POSTER.image_width,
        height: CARD_SIZES.POSTER.image_height,
      },
    });

    this._FocusBorder.patch({
      texture: null,
      ShadowLeft: { texture: null },
      ShadowRight: { texture: null },
    });
  }

  _handleEnter() {
    const { callback } = this._props;
    callback();
  }

  _handleClick() {
    const { callback } = this._props;
    callback();
  }

  _handleHover() {
    this._focus();
    this.fireAncestors("$handleItemHover", this.parent.children.indexOf(this));
  }

  setProps(props) {
    this._props = { ...this._props, ...props };
  }
}
