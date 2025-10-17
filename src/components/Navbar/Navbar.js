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
  }

  set items(arr) {
    this.tag("Items").items = this.items.map((it, idx) => ({
      type: NavItem,
      x: idx * 200,
      item: it,
      Label: {
        text: this.items.label,
      },
    }));
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
    this.fireAncestors("$focusContentZone");
    return true;
  }
  _handleEnter() {
    const { path } = this._items[this._i];
    if (path) Router.navigate(path);
    return true;
  }
}
