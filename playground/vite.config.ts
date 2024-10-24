import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Iconify from '../src/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    Iconify({
      convert: {
        svg: {
          path: './icons',
          noColor: true,
        },
        icon: './icons',
      },
      iconifyIntelliSense: true,
    }),
  ],
})
