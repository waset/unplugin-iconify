import type { UnpluginFactory } from 'unplugin'
import type { Options } from './core/types'
import { createUnplugin } from 'unplugin'
import { Iconify } from './core'

export { Iconify } from './core'
export type { Options } from './core/types'
export * from './loader'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => {
  /**
   * 初始化
   */
  const handle = new Iconify(options)

  return {
    name: 'unplugin-iconify',
    enforce: 'pre',
    buildStart: async () => {
      /**
       * 转换图标
       */
      await handle.toConvert()

      /**
       * 加载图标
       */
      await handle.toLoad()

      /**
       * 生成 Iconify IntelliSense 配置
       */
      await handle.toIntelliSense()
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
