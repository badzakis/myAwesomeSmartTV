import { Lightning } from "@lightningjs/sdk";
import PosterCard from "../PosterCard/PosterCard.js";

export default class Row extends Lightning.Component {
  _props = {
    posterW: 100,
    posterH: 100,
  };
  static _template() {
    return {
      w: 1920,
      h: 500,
      Title: { x: 100, y: 40, text: { text: "", fontSize: 26 }, alpha: 0.8 },
      List: {
        x: 80,
        y: 75,
        w: 1920 - 160,
        h: 480,
        clipping: true,
        Wrapper: { x: 0, y: 0 },
      },
    };
  }

  _init() {
    this.pLeft = 30;
    this._index = 0;
    this._gap = 10;
    this._cardW = 220;
    this._cardH = 320;
  }

  set props(props) {
    // console.warn("ROW PROPS BEFORE: ", this._props);
    this._props = { ...this._props, ...props };
    // console.warn("ROW PROPS AFTER: ", this._props);
  }

  set title(v) {
    this.tag("Title").text.text = v || "";
  }

  set items(arr) {
    this._items = arr || [];
    this.tag("Wrapper").children = this._items.map((item, i) => ({
      type: PosterCard,
      x: this.pLeft + i * (this._cardW + this._gap),
      item: item,
      props: {
        width: this._props.posterW,
        height: this._props.posterH,
        imageSrc: item.poster,
      },
    }));
    // console.warn("ITEMS MAP:", this._items);
  }

  get _wrapper() {
    return this.tag("Wrapper");
  }
  get _cards() {
    return this._wrapper.children || [];
  }
  get _canScroll() {
    return this._cards.length * (this._cardW + this._gap) > this.tag("List").w;
  }

  _getFocused() {
    return this._cards[this._index];
  }

  _updateX() {
    if (!this._canScroll) return;
    const offset = Math.max(0, this._index * (this._cardW + this._gap) - 80);
    this._wrapper.setSmooth("x", -offset);
  }

  _handleRight() {
    if (this._index < this._cards.length - 1) {
      this._index++;
      this._updateX();
      console.log("INDEX CHANGE", {
        idx: this._index,
        type: this.constructor.name,
      });
      return true;
    }
    // kraj reda → pusti roditelju da reši (npr. fokus na Sidebar)
    return this.fireAncestors("$focusNextZone");
  }

  _handleLeft() {
    if (this._index > 0) {
      this._index--;
      this._updateX();
      console.log("INDEX CHANGE", {
        idx: this._index,
        type: this.constructor.name,
      });
      return true;
    }
    // početak reda → možda fokus na Navbar widget
    return this.fireAncestors("$requestWidgetFocus", "Navbar");
  }

  _handleUp() {
    console.log("INDEX CHANGE", {
      idx: this._index,
      type: this.constructor.name,
    });
    // roditelj (Home) odlučuje koji sledeći red da uzme
    return this.fireAncestors("$focusRowUp");
  }

  _handleDown() {
    console.log("INDEX CHANGE", {
      idx: this._index,
      type: this.constructor.name,
    });
    return this.fireAncestors("$focusRowDown");
  }

  _handleEnter() {
    const item = this._items[this._index];
    // npr. idi na Movies detalj, ili što već
    // Router.navigate(`movie/${slugify(item.title)}`)
    return true;
  }
}
