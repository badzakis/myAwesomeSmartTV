import { Lightning as lng, Utils, Router } from "@lightningjs/sdk";

export default class PosterCard extends lng.Component {
  _props = {};
  static _template() {
    const width = 180,
      height = 280;
    return {
      y: 50,
      w: width,
      h: height,
      // Fokus "ring" kao tekstura pravougaonika, po defaultu skriven
      FocusRing: {
        alpha: 0,
        texture: lng.Tools.getRoundRect(
          width + 12,
          height + 12,
          8,
          4,
          0xffffffff,
          true,
          0x00000000
        ),
        mount: 0,
        x: 0,
        y: 0,
      },
      Poster: {
        rect: true,
        width,
        height,
        mount: 0,
        x: width,
        y: height,
        src: null,
      },
      Title: {
        y: height,
        x: 0,
        text: {
          text: "",
          fontSize: 22,
          wordWrap: true,
          wordWrapWidth: width,
          maxLines: 2,
          maxLinesSuffix: "...",
        },
        alpha: 0.7,
      },
    };
  }

  set props(props) {
    // console.warn("PROPS BEFORE: ", this._props);
    this._props = { ...this._props, ...props };
    // console.error("PROPS AFTER: ", this._props);

    const { width, height, imageSrc, title } = this._props;

    this.patch({
      width,
      height,
      FocusRing: {
        texture: lng.Tools.getRoundRect(
          width,
          height,
          10,
          6,
          0xffff4365,
          true,
          0x00000000
        ),
        x: 0,
        y: 0,
      },
      Poster: {
        w: width,
        h: height,
        x: 4,
        y: 4,
        src: imageSrc,
        shader: { type: lng.shaders.RoundedRectangle, radius: 8 },
      },
      Title: {
        y: height + 12,
        ...(title && { text: title }),
      },
    });
  }
  set item(v) {
    this._item = v;
    const path = v.src ?? v.poster; // podrži i staro i novo ime
    const url = /^https?:\/\//i.test(path) ? path : Utils.asset(path);
    this.tag("Poster").src = url;
    this.tag("Title").text.text = v.title || "";
  }

  _focus() {
    this.patch({
      smooth: { scale: 1.06 },
      FocusRing: { alpha: 1 },
    });

    this._props.trailerSrc &&
      this.fireAncestors(
        "$changeBackground",
        this._props.trailerSrc,
        this._props.description
      );
  }

  _unfocus() {
    this.patch({
      smooth: { scale: 1.0 },
      FocusRing: { alpha: 0 },
    });
  }

  _handleEnter() {
    this._props.itemId && Router.navigate(`details/${this._props.itemId}`);
  }
}
