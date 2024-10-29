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
        icon: {
          path: './icons',
          noColor: true,
        },
        svg: './icons',
      },
      output: './playground/node_modules/.unplugin-iconify',
      iconifyIntelliSense: true,
    }),
  ],
})
