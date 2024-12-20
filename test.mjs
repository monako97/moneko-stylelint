import util from "./lib/config/index.cjs";

util.stylelint
  .lint({
    config: util.config,
    files: "__tests__/*.{css,less,scss}",
    formatter: "string",
  })
  .then((res) => {
    console.log(res.code);
    if (res.report) {
      console.error(res.report);
    }
  })
  .catch((e) => {
    console.error(e);
  });
