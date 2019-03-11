const fs = require("fs");
const { resolve } = require("path");

exports.init = router =>
  router.get("/api/fetchChartData", async ctx => {
    ctx.body = fs.readFileSync("server/api/chart_data.json");
  });
