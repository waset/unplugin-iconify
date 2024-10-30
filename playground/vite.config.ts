import { join } from 'node:path'
import { cwd } from 'node:process'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Iconify from '../src/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    Iconify({
      workspace: join(cwd(), '..'),
      convert: {
        // 直接导出目录
        svg: './icons',
        // 不导出颜色
        icon: {
          path: './icons',
          noColor: true,
        },
        // 不导出颜色且添加后缀
        suffix: {
          path: './icons',
          noColor: true,
          suffix: 'color',
        },
      },
      output: join(cwd(), '../playground/node_modules/.unplugin-iconify'),
      iconifyIntelliSense: true,
    }),
  ],
})
