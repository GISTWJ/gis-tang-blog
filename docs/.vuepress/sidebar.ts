import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",//首页
    {
      text: "学习笔记",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
  ],
});
