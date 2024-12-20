const path = require("path");

module.exports = function (source) {
  // 如果 source 中包含 .json 文件
  if (source.includes("require") && source.includes(".json")) {
    return source.replace(
      /require(?:\$?\d*)\(['"]([^'"]+\.(json|js))['"]\)/g,
      (match, jsonPath) => {
        let absPath;

        // 判断是相对路径还是模块路径
        if (jsonPath.startsWith(".") || jsonPath.startsWith("/")) {
          absPath = path.resolve(this.context, jsonPath);
        } else {
          absPath = require.resolve(jsonPath, { paths: [this.context] });
        }

        try {
          return JSON.stringify(require(absPath));
        } catch (error) {
          // 如果读取文件失败，抛出错误
          this.emitError(
            new Error(
              `Failed to inline JSON file: ${jsonPath}\n${error.message}`
            )
          );
          return match; // 保留原始 require 语句
        }
      }
    ).replace(/const require\s*=\s*createRequire\(import\.meta\.url\);\s*/g, '');
  }

  // 如果不包含 .json 文件，返回原始 source
  return source;
};
