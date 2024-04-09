```
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang:'zh-CN',
  title: 'Tang',
  description: 'Just playing around',
  bundler: viteBundler(),
  theme: defaultTheme({
    navbar:[
      {
        text:'首页',
        link:'/'
      },
      {
        text:'技术文档',
        children:[]
      }
    ]
  }),
})

```

