/**
 * 转换内容
 */
export interface Convert {
  /**
   * 要扫描文件的目录的路径。
   */
  path: string

  /**
   * 生成的类型文件的命名空间后缀。
   */
  suffix?: string

  /**
   * 是否为无色
   */
  noColor?: boolean
}

/**
 * 选项
 */
export interface Options {
  /**
   * 工作区路径
   * @description 项目根目录
   * @default process.cwd()
   */
  workspace?: string

  /**
   * 要转换的图表集
   *
   * @example
   * ```ts
    convert: {
      icon: '~/icons',
      svg: {
        path: '~/icons',
        noColor: true,
      },
      mixed: {
        path: '~/icons',
        suffix: 'mixed',
      },
    },
   *```
   */
  convert?: Record<string, Convert['path'] | Convert>

  /**
   * 生成的类型文件的输出目录。
   *
   * @default process.join(process.cwd(), 'node_modules/.unplugin-iconify')
   */
  output?: string

  /**
   * 是否支持 [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)
   * @description 开启后将自动更新 `.vscode/settings.json` 的 `iconify.customCollectionJsonPaths` 配置
   * @default false
   */
  iconifyIntelliSense?: boolean | string
}

export type Optional<T> = Required<{
  [K in keyof T as T[K] extends Required<T>[K] ? never : K]: T[K]
}>

export type Loaders = 'unocss'

export type Awaitable<T> = T | PromiseLike<T>
export type CustomIconLoader = (name: string) => Awaitable<string | undefined>
export type CustomIconLoaderMap = Record<string, CustomIconLoader>
