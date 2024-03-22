import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "笔记",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "开发过程问题汇总",
        icon: "pen-to-square",
        prefix: "dev-process/",
        children: [
          // { text: "Cesium中的removeAll", icon: "pen-to-square", link: "050、Cesium中的removeAll()" },
        ],
      },
    ],
  },
  "/demo/",
]);
