import { Lightning as lng } from "@lightningjs/sdk";

export default class NavItem extends lng.Component {
  static _template() {
    return {
      w: 160,
      h: 40,
      Label: { text: { text: "", fontSize: 28 } },
      Under: { y: 34, rect: true, w: 0, h: 4, color: 0xffffffff, alpha: 0.9 },
    };
  }

  set item(v) {
    this._item = v; // { label, path }
    this.tag("Label").text.text = v.label || "";
  }
  get value() {
    return this._item;
  }

  _focus() {
    this.tag("Under").setSmooth("w", 80);
    this.patch({ smooth: { scale: 1.05 } });
  }
  _unfocus() {
    this.tag("Under").setSmooth("w", 0);
    this.patch({ smooth: { scale: 1.0 } });
  }
}
