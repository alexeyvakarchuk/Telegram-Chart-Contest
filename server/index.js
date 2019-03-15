const config = require("./config/default");
const app = require("./server");

console.log("Running on server ::: ", `http://${config.host}:${config.port}`);

app.listen(config.port, config.host);
