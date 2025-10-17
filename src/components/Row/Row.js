import { Lightning } from "@lightningjs/sdk";
import PosterCard from "../PosterCard/PosterCard.js";

export default class Row extends Lightning.Component {
  _index = 0;
  _props = {
    posterW: 100,
    posterH: 100,
    items: [],
    title: "",
    width: 1920,
    height: 500,
    itemsWidht: 1760,
    itemsHeight: 480,
    pLeft: 30,
    gap: 10,
    cardW: 220,
    cardH: 320,
  };

  static _template() {
    return {
      Title: {
        x: 100,
        y: 40,
        Text: { fontSize: 26 },
        alpha: 0.8,
        visible: false,
      },
      List: {
        x: 80,
        y: 75,
        clipping: true,
        Wrapper: { x: 0, y: 0 },
      },
    };
  }

  set props(props) {
    // console.warn("ROW PROPS BEFORE: ", this._props);
    this._props = { ...this._props, ...props };
    // console.warn("ROW PROPS AFTER: ", this._props);
    const { width, height, title, itemsWidht, itemsHeight, items } =
      this._props;
    this.patch({
      w: width,
      h: height,
      Title: {
        ...(title && {
          Text: {
            text: title,
          },
          visible: true,
        }),
      },
      List: {
        w: itemsWidht,
        h: itemsHeight,
        ...(!title && {
          x: 0,
          y: 0,
        }),
      },
    });

    this.tag("Wrapper").children = items;
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
    return this.tag("Wrapper").children[this._index];
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
    return this.fireAncestors("$requestWidgetFocus", "Menu");
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
