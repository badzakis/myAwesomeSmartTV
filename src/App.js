import { Router, Utils, Colors } from "@lightningjs/sdk";

// import LoadingScreenComponent from "./components/LoadingScreenComponent/LoadingScreenComponent";
import routes from "./router/routes";
import Navbar from "./components/Navbar/Navbar";

export default class App extends Router.App {
  static _template() {
    return {
      ...super._template(),
      collision: true,
      Pages: {
        collision: true,
        w: 1920,
        h: 1080,
      },
      // Loading: {
      //   type: LoadingScreenComponent,
      //   rect: true,
      //   w: 1920,
      //   h: 1080,
      //   zIndex: 102,
      //   color: Colors("#000000").get(),
      //   props: {
      //     xPos: 960,
      //     yPos: 540,
      //   },
      // },
      Widgets: {
        Menu: {
          type: Navbar,
        },
      },
    };
  }

  get _Column() {
    return this.tag("Widgets");
  }

  get _Menu() {
    return this.tag("Widgets.Menu");
  }

  _setup() {
    Router.startRouter(
      {
        ...routes,
      },
      this
    );
  }
}
