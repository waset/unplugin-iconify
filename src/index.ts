import type { UnpluginFactory } from 'unplugin'
import type { Options } from './core/types'
import { createUnplugin } from 'unplugin'
import { Iconify } from './core'

export const unpluginFactory: UnpluginFactory<Options> = options => ({
  name: 'unplugin-iconify',
  buildStart: async () => {
    /**
     * 初始化
     */
    const handle = new Iconify(options)

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
})

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
export type { Options } from './core/types'
