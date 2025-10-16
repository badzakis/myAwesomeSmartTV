import { Lightning, Router, Utils } from "@lightningjs/sdk";
import Row from "../components/Row/Row.js";
import Column from "../components/Column/Column.js";
import { movies } from "../data/movies.js";
import { series } from "../data/series.js";
import { channels } from "../data/channels.js";

export default class Home extends Lightning.Component {
  static _template() {
    return {
      // Pozadina ako hoćeš
      Background: {
        w: 1920,
        h: 1080,
        src: Utils.asset("images/background.png"),
      },

      Wrapper: {
        x: 0,
        y: 60,
        Content: {
          MoviesRow: {
            type: Row,
            y: 100,
            title: "MOVIES",
            props: { posterW: 200, posterH: 300 },
            items: [],
          },
          SeriesRow: {
            type: Row,
            y: 550,
            title: "SERIES",
            props: { posterW: 200, posterH: 300 },
            items: [],
          },
        },
        Sidebar: {
          x: 1920 - 60 - 300 - 60,
          y: 150, // desno
          type: Column,
          title: "Top 5 Channels",
          props: { w: 280, h: 136 },

          items: [],
        },
      },
    };
  }

  _init() {
    this._rows = [this.tag("MoviesRow"), this.tag("SeriesRow")];
    this._rowIndex = 0;
    this._zone = "content"; // 'content' | 'sidebar'
    this._lastRowIndex = 0;
    this.tag("MoviesRow").items = movies;
    this.tag("SeriesRow").items = series;
    this.tag("Sidebar").items = channels.slice(0, 5);
  }

  _getFocused() {
    // Fokus je ili neki Row ili Sidebar
    return this._zone === "sidebar"
      ? this.tag("Sidebar")
      : this._rows[this._rowIndex];
  }

  // Signali iz Row/Column preko fireAncestors:
  $focusRowUp() {
    if (this._zone !== "content") return true;
    if (this._rowIndex === 0) Router.focusWidget("Menu");
    else {
      this._rowIndex--;
      // this.application.updateFocus();
    }
    return true;
  }

  $focusRowDown() {
    if (this._zone !== "content") return;
    if (this._rowIndex < this._rows.length - 1) {
      this._rowIndex++;
      this._refocus();
    } else {
      return this.$focusSidebar();
    }
  }

  $focusNextZone() {
    this._focusSidebar();
  }
  // iz Column na levo:
  $focusContentZone(payload = {}) {
    this._zone = "content";
    // ako je poslat hint, koristi ga, inače se vrati gde si bio
    if (typeof payload.row === "number") {
      this._rowIndex = Math.min(
        Math.max(payload.row, 0),
        this._rows.length - 1
      );
    } else {
      this._rowIndex = this._lastRowIndex ?? 0;
    }
    this._refocus();
    return true;
  }

  $requestWidgetFocus(name) {
    Router.focusWidget();
  }

  _focusSidebar() {
    // preusmeri fokus na Column preko Lightning mehanike
    this._lastRowIndex = this._rowIndex;
    this._zone = "sidebar";
    this._refocus();
  }
}
