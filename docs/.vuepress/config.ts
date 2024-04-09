import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "歪脖祭司",
  description: "歪脖祭司的祭坛",

  theme,
});
module.exports = {
  plugins: [
    'vuepress-plugin-mini-sandbox'
  ]
}