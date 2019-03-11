import "@babel/polyfill";
import "./styles/main.sass";

import helloWorld from "scripts/child";

if (module.hot) {
  module.hot.accept("./scripts/child", () => {
    helloWorld();
  });
}
