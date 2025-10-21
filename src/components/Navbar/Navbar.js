import { Lightning as lng, Router, Utils } from "@lightningjs/sdk";
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
      w: 1920,
      h: 120,
      Logo: {
        rect: true,
        w: 302,
        h: 60,
        y: 20,
        src: Utils.asset("images/shindirilogo.png"),
      },
      Items: {
        x: 312,
        y: 20,
        type: Row,
      },
    };
  }

  // _logFocusPath(tag = "?") {
  //   const app = this.stage?.application || this.application;
  //   const path = (app.focusPath || app._focusPath || []).map(
  //     (c) => c.constructor?.name
  //   );
  //   console.warn(`[${tag}] Focus →`, path.join(" > "));
  // }

  // zovi u _init() i u _captureEnter/_handleEnter:

  // _captureEnter() {
  //   this._logFocusPath(this.constructor.name);
  //   console.warn(`[${this.constructor.name}] capture ENTER`);
  //   return false;
  // }
  // _handleEnter() {
  //   this._logFocusPath(this.constructor.name);
  //   console.warn(`[${this.constructor.name}] handle ENTER`);
  //   return true;
  // }

  _init() {
    this.patch({
      Items: {
        props: {
          items: DEFAULT_ITEMS.map((item, i) => ({
            type: NavItem,
            x: 20 + i * (180 + 10),
            item,
            props: {
              title: item.title,
              label: item.label,
              path: item.path,
            },
          })),
        },
      },
    });
  }

  set items(arr) {
    this._items = arr || DEFAULT_ITEMS;
    this.tag("Items").items = this._items.map((it, idx) => ({
      type: NavItem,
      x: idx * 200,
      item: it,
      Title: {},
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
    Router.focusPage();
    return true;
  }
}
