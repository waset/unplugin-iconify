/**
 * 转换内容
 */
export interface Convert {
  /**
   * 要扫描文件的目录的路径。
   */
  path: string
  /**
   * 生成的类型文件的命名空间前缀。
   */
  prefix: string
  /**
   * 生成的类型文件的输出目录。
   */
  out?: string
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
   * 要转换的图表集
   */
  convert: Convert | Convert[]
}
