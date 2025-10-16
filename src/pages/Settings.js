import { Lightning } from "@lightningjs/sdk";
export default class Settings extends Lightning.Component {
  static _template() {
    return { Label: { x: 80, y: 80, text: { text: "SETTINGS" } } };
  }
}
