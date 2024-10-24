# unplugin-iconify

[![NPM version](https://img.shields.io/npm/v/@waset/unplugin-iconify?color=blue)](https://www.npmjs.com/package/@waset/unplugin-iconify)

## Install

```bash
pnpm i -D @waset/unplugin-iconify
```

## Configuration

```ts
Iconify({
  convert: {
    icon: './icons',
    svg: {
      path: './icons',
      noColor: true,
    },
    suffix: {
      path: './icons',
      noColor: true,
      suffix: 'color',
    },
  },
  output: 'dist/icons', // @default 'node_modules/.unplugin-iconify'
  iconifyIntelliSense: true, // @default false
})
```

- 如果开启 `iconifyIntelliSense`，将自动创建/更新 `.vscode/settings.json` 文件，用于 VSCode 插件 [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)

- `convert` 选项用于将图标转换为图标集，请查看 `src/core/types.ts` 获取更多类型信息。

## Usage

<details>
<summary>Vite</summary>

```ts
// vite.config.ts
import Iconify from '@waset/unplugin-iconify/vite'

export default defineConfig({
  plugins: [
    Iconify({
      // ...
    })
  ],
})
```
</details>

<details>
<summary>Nuxt</summary>

```ts
// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // ...
    '@waset/unplugin-iconify/nuxt'
  ],
  Iconify: {
    // ...
  },
})
```
</details>

<details>
<summary>unocss</summary>

```ts
// uno.config.ts
import { UnocssLoader } from '@waset/unplugin-iconify/loader'
import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    // ...
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        ...UnocssLoader(),
      },
    }),
  ],
  // ...
})
```
</details>

## Thanks

- [unplugin](https://github.com/unjs/unplugin)
- [unplugin/unplugin-icons](https://github.com/unplugin/unplugin-icons)
- [unocss](https://github.com/unocss/unocss)
