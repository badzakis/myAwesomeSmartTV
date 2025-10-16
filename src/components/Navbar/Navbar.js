import { Lightning as lng, Router } from "@lightningjs/sdk";
import NavItem from "./Navbaritem.js";
import Row from "../Row/Row.js";

const DEFAULT_ITEMS = [
  { label: "HOME", path: "home" },
  { label: "LIVE", path: "live" },
  { label: "MOVIES", path: "movies" },
  { label: "SETTINGS", path: "settings" }, // maybe without navbar on that route
];

export default class Navbar extends lng.Component {
  static _template() {
    return {
      x: 60,
      y: 20,
      Items: {
        type: Row,
      },
    };
  }

  _init() {
    this._i = 0;
    this.items = DEFAULT_ITEMS;
  }

  set items(arr) {
    this._items = arr || DEFAULT_ITEMS;
    this.tag("Items").items = this._items.map((it, idx) => ({
      type: NavItem,
      x: idx * 200,
      // Label: { text: { text: it.label, fontSize: 28 } },
      // Under: { y: 34, rect: true, w: 0, h: 4, color: 0xffffffff, alpha: 0.9 },
    }));
    console.log(this._items);
  }

  _getFocused() {
    return this.tag("Items"); //.children[this._i];
  }

  _handleRight() {
    if (this._i < this._items.length - 1) {
      this._i++;
      return true;
    }
    return true;
  }
  _handleLeft() {
    if (this._i > 0) {
      this._i--;
      return true;
    }
    return true;
  }
  _handleDown() {
    // Drop focus back to page content zone
    this.fireAncestors("$focusContentZone", { row: -1 });
    return true;
  }
  _handleEnter() {
    const { path } = this._items[this._i];
    if (path) Router.navigate(path);
    return true;
  }
}
