import "@babel/polyfill";
import "./styles/main.sass";
import init from "scripts/init";

init();

if (module.hot) {
  module.hot.accept("./scripts/init", init);
}
