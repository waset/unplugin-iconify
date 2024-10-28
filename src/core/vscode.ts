import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { injectJsonc } from './utils'

/**
 * vscode `iconify.customCollectionJsonPaths` 配置
 *
 * @param dir `.vscode` 的绝对路径
 * @param jsons json 文件路径
 */
export async function IconifyIntelliSenseSettings(dir: string, jsons: string[]): Promise<void> {
  // 判断目录是否存在
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  // 判断文件是否存在
  const settingPath = join(dir, 'settings.json')
  if (!existsSync(settingPath)) {
    writeFileSync(settingPath, '{}')
  }
  // 生成配置
  const settingText = readFileSync(settingPath, 'utf-8')
  // 写入配置
  writeFileSync(settingPath, injectJsonc(settingText, 'iconify.customCollectionJsonPaths', jsons), {
    encoding: 'utf-8',
  })
}
