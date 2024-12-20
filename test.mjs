import stylelint from "./lib/stylelint.cjs";
import config from "./lib/index.cjs";

stylelint
  .lint({
    config: config,
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
