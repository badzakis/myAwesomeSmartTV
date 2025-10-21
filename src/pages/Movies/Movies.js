import { Lightning, Utils, Colors } from "@lightningjs/sdk";
import Row from "../../components/Row/Row";
export default class Movies extends Lightning.Component {
  static _template() {
    return {
      Label: { x: 50, y: 150, text: { text: "MOVIES" } },
      collision: true,
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        // src: Utils.asset("images/background.png"),
        color: Colors("#34663b").get(),
      },
      MovieBg: {
        rect: true,
        w: 1920,
        h: 697,
        colorRight: Colors("#151515").get(),
        colorLeft: Colors("#151515").get(),
        colorTop: Colors("#ac2626").get(),
        colorBottom: Colors("#ac2626").get(),
      },
      Details: {
        flex: {
          direction: "column",
        },
        x: 70,
        y: 260,
        Title: {
          text: {
            fontSize: 28,
            lineHeight: 30,
            textColor: Colors("#FFFFFF").get(),
          },
        },
        Description: {
          text: {
            fontSize: 22,
            lineHeight: 31,
            wordWrapWidth: 698,
            textColor: Colors("#FFFFFF").get(),
          },
        },
      },
      MoviesList: {
        type: Row,
        x: 69,
        y: 697,
        props: {
          h: 302,
          w: 1792,
        },
      },
    };
  }

  get _MovieBg() {
    return this.tag("MovieBg");
  }
  get _Details() {
    return this.tag("Details");
  }
  get _Title() {
    return this.tag("Title");
  }
  get _Description() {
    return this.tag("Description");
  }
  get _MovieList() {
    return this.tag("MovieList");
  }
}
