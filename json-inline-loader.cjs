const fs = require("fs");
const path = require("path");

module.exports = function (source) {
  // 如果 source 中包含 .json 文件
  if (source.includes("require") && source.includes(".json")) {
    return source.replace(
      /require(?:\$?\d*)\(['"]([^'"]+\.json)['"]\)/g,
      (match, jsonPath) => {
        let absPath;

        // 判断是相对路径还是模块路径
        if (jsonPath.startsWith(".") || jsonPath.startsWith("/")) {
          absPath = path.resolve(this.context, jsonPath);
        } else {
          absPath = require.resolve(jsonPath, { paths: [this.context] });
        }

        try {
          // 同步读取 JSON 文件内容
          const jsonContent = fs.readFileSync(absPath, "utf8");
          return JSON.stringify(JSON.parse(jsonContent));
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
    );
  }

  // 如果不包含 .json 文件，返回原始 source
  return source;
};
