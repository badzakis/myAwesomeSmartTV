import { Utils, Lightning, Colors } from "@lightningjs/sdk";

import colors from "../../../reskin/colors.json";
import { CARD_SIZES } from "../constants/constants";
import Image from "../Image/Image";

export default class MovieItem extends Lightning.Component {
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
      collision: true,
      w: CARD_SIZES.MOVIE.width,
      h: CARD_SIZES.MOVIE.height,
      x: 0,
      y: 0,
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
          w: 403,
          text: {
            text: "Title",
            fontSize: 24,
            fontFace: "Montserrat-Regular",
            lineHeight: 24,
            maxLines: 1,
            wordWrapWidth: 403,
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
      id,
    } = this._props;

    this.setProps({
      width: CARD_SIZES.MOVIE.image_width,
      height: CARD_SIZES.MOVIE.image_height,
    });

    this._Title.patch({
      text: {
        text: itemTitle,
      },
    });

    this._PosterImage.patch({
      props: {
        width: CARD_SIZES.MOVIE.image_width,
        height: CARD_SIZES.MOVIE.image_height,
        imageSrc: imageSrc,
        placeholderSrc: placeholderSrc,
        radius: radius,
      },
    });
  }

  _focus() {
    const { radius, strokeWidth } = this._props;

    this.patch({
      h: CARD_SIZES.FOCUSED_MOVIE.height,
      w: CARD_SIZES.FOCUSED_MOVIE.width,
      y:
        (CARD_SIZES.MOVIE.height - CARD_SIZES.FOCUSED_MOVIE.height) / 2 -
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
        width: CARD_SIZES.FOCUSED_MOVIE.image_width,
        height: CARD_SIZES.FOCUSED_MOVIE.image_height,
      },
    });

    this._FocusBorder.patch({
      texture: lng.Tools.getRoundRect(
        CARD_SIZES.FOCUSED_MOVIE.image_width,
        CARD_SIZES.FOCUSED_MOVIE.image_height,
        radius,
        strokeWidth,
        Colors(colors.focus).get(),
        false
      ),
    });

    this.fireAncestors("$setDetails", this._props.index);
  }

  _unfocus() {
    this.patch({
      w: CARD_SIZES.MOVIE.width,
      h: CARD_SIZES.MOVIE.height,
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
        width: CARD_SIZES.MOVIE.image_width,
        height: CARD_SIZES.MOVIE.image_height,
      },
    });

    this._FocusBorder.patch({
      texture: null,
    });
  }

  _handleEnter() {
    const { callback } = this._props;
    this._unfocus();
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
