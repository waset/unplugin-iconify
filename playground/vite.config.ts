import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
/**
 *  package.json
 *
 *  "unplugin-iconify": "workspaces:*",
 */
// import Iconify from '../src/vite'
import Iconify from '@waset/unplugin-iconify/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    Iconify(),
  ],
})
