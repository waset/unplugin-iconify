import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Iconify from '../src/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    Iconify({
      convert: [
        {
          path: './icons',
          prefix: 'icon',
          noColor: true,
        },
        {
          path: './icons',
          prefix: 'icon-color',
        },
      ],
    }) as any,
  ],
})
