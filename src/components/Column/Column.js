import { Lightning, Utils } from "@lightningjs/sdk";
import PosterCard from "../PosterCard/PosterCard.js";

export default class Column extends Lightning.Component {
  _props = {};
  static _template() {
    return {
      Title: { x: 0, y: 0, text: { text: "", fontSize: 28 }, alpha: 0.8 },
      List: { x: 0, y: 48, Wrapper: {} },
    };
  }

  set props(props) {
    // console.warn("PROPS BEFORE: ", this._props);
    this._props = { ...this._props, ...props };
    // console.warn("PROPS AFTER: ", this._props);
  }
  _init() {
    this._index = 0;
    this._gap = 16;
    this._cardW = 50;
    this._cardH = 50;
  }
  set title(v) {
    this.tag("Title").text.text = v || "";
  }

  set items(arr) {
    this._items = arr || [];
    this.tag("Wrapper").children = this._items.map((it, i) => ({
      type: PosterCard,
      y: i * (120 + this._gap),
      item: it,
      w: 280,
      h: 136,

      props: {
        width: this._cardW,
        height: this._cardH,
        imageSrc: Utils.asset(it.poster),
      },
    }));
  }

  get _cards() {
    return this.tag("Wrapper").children || [];
  }
  _getFocused() {
    return this._cards[this._index];
  }

  _handleDown() {
    if (this._index < this._cards.length - 1) {
      this._index++;
      // console.log("INDEX CHANGE", {
      //   idx: this._index,
      //   type: this.constructor.name,
      // });
      return true;
    }
    return this.fireAncestors("$focusRowDown");
  }
  _handleUp() {
    if (this._index > 0) {
      this._index--;
      return true;
    } else return this.fireAncestors("$requestWidgetFocus", "Menu");
  }
  _handleLeft() {
    this.fireAncestors("$focusContentZone"), { row: 234 };
    return true;
  }
}
