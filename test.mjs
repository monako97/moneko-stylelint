import config from "./lib/config.cjs";
import stylelint from "./lib/index.cjs";

stylelint.lint({
  config,
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
