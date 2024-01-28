// rollup.config.dev.js dev
import PluginJson from "@rollup/plugin-json";
import PluginVue from "rollup-plugin-vue";
// 自定义插件
import PluginClearConsole from "../plugins/rollup-plugin-clear-console";

export default {
  input: "./src/index.js",
  output: {
    // file: "dist/bundle.js",
    format: "es",
    dir: "dist",
  },
  plugins: [
    PluginVue(),
    PluginJson(),
    PluginClearConsole({
      include: ["**/main.js"],
    }),
  ],
};