import { Lightning as lng, Colors, Router } from "@lightningjs/sdk";

export default class NavItem extends lng.Component {
  static _template() {
    return {
      ...super._template(),
      collision: true,
      h: 49,
      w: 150,
      Title: {
        w: 150,
        h: 40,
        text: {
          text: "Title",
          fontSize: 24,
          lineHeight: 40,
          maxLines: 1,
          wordWrapWidth: 150,
          textAlign: "center",
          verticalAlign: "middle",
        },
      },
      Line: {
        y: 40,
        w: 150,
        h: 5,
        rect: true,
        shader: { type: lng.shaders.RoundedRectangle },
        color: Colors("#ED1C24").get(),
        visible: false,
      },
    };
  }

  get _Line() {
    return this.tag("Line");
  }

  get _Title() {
    return this.tag("Title");
  }
  getSelectedIndex() {
    if (this._props.selected) {
      return this._props.index;
    }
    return -1;
  }
  set props(props) {
    this._props = {
      ...this._props,
      ...props,
    };

    const { label, x, selected } = props;

    this._Title.patch({
      text: {
        textColor: Colors(selected ? "#b82020" : "#f0f2f5ff").get(),
      },
    });

    if (label) {
      this._Title.patch({
        text: {
          text: label,
        },
      });
    }
  }
  _focus() {
    // this.Title(true);
    this._Line.visible = true;
    this.tag("Line").setSmooth("w", 150);
    this.patch({ smooth: { scale: 1.05 } });
  }
  _unfocus() {
    // this.Title(false);

    this._Line.visible = false;
    this.tag("Line").setSmooth("w", 0);
    this.patch({ smooth: { scale: 1.0 } });
  }

  _handleEnter() {
    Router.navigate(this._props.path);
  }
}
