import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'
import { injectJsonc } from './utils'

/**
 * vscode `iconify.customCollectionJsonPaths` 配置
 *
 * @param options false: 不注入, true: 注入默认路径, string: 注入指定路径
 * @param jsons json 文件路径
 */
export async function IconifyIntelliSenseSettings(options: true | string, jsons: string[]): Promise<void> {
  let dir = join(cwd(), '.vscode')
  if (typeof options === 'string') {
    dir = join(options)
  }
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  const settingPath = join(dir, 'settings.json')

  if (!existsSync(settingPath)) {
    writeFileSync(settingPath, '{}')
  }

  const settingText = readFileSync(settingPath, 'utf-8')

  writeFileSync(settingPath, injectJsonc(settingText, 'iconify.customCollectionJsonPaths', jsons), {
    encoding: 'utf-8',
  })
}
