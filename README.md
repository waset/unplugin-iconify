# unplugin-iconify

[![NPM version](https://img.shields.io/npm/v/@waset/unplugin-iconify?color=blue)](https://www.npmjs.com/package/@waset/unplugin-iconify)

## 安装

```bash
pnpm i -D @waset/unplugin-iconify
```

## 使用

```ts
Iconify({
  /**
   * 工作区路径
   * @description 项目根目录
   * @default process.cwd()
   */
  workspace: cwd(),
  /**
   * 图标转换配置
   */
  convert: {
    // 直接导出目录
    svg: 'assets/icons',
    // 不导出颜色
    icon: {
      path: 'assets/icons',
      noColor: true,
    },
    // 不导出颜色且添加后缀
    suffix: {
      path: 'assets/icons',
      noColor: true,
      suffix: 'color',
    },
  },

  /**
   * 输出目录
   * @type string
   * @default `process.join(process.cwd(), 'node_modules/.unplugin-iconify')`
   */
  output: 'dist/icons',

  /**
   * 是否适配 VSCode 插件 Iconify IntelliSense
   * @type boolean | string
   * @default false
   */
  iconifyIntelliSense: true,
})
```

#### 补充

- 如果开启 `iconifyIntelliSense`将自动创建/更新 `.vscode/settings.json` 文件，用于 VSCode 插件 [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)

- 请查看 [`src/core/types.ts`](https://github.com/waset/unplugin-iconify/blob/main/src/core/types.ts) 获取更多类型信息。

#### 用例

> 参照上述 `convert` 配置，如果拥有 `assets/icons/cat.svg`,将会生成以下 `iconify` 图标

- `icon-cat` `icon:cat` `i-icon-cat`
- `svg-cat` `svg:cat` `i-svg-cat`
- `suffix-cat-color` `suffix:cat-color` `i-suffix-cat-color`

## 配置

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
<summary>Unocss</summary>

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
        ...UnocssLoader(/** output */),
      },
    }),
  ],
  // ...
})
```
</details>

## 感谢

- [unplugin](https://github.com/unjs/unplugin)
- [unplugin/unplugin-icons](https://github.com/unplugin/unplugin-icons)
- [unocss](https://unocss.dev/presets/icons)
