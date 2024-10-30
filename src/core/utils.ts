import type { FormattingOptions } from 'jsonc-parser'
import * as jsonc from 'jsonc-parser'

/**
 * 更新 json 指定 key 的值
 * @param content json 文本
 * @param key key
 * @param value 新值
 */
export function injectJsonc(content: string, key: string, value: any): string | NodeJS.ArrayBufferView {
  const formatting = detectIndentation(content)

  const edits = jsonc.modify(
    content,
    toArray(key),
    value,
    {
      formattingOptions: {
        eol: '\n',
        insertFinalNewline: true,
        ...formatting,
      },
    },
  )

  const updatedcontent = jsonc.applyEdits(content, edits)

  return updatedcontent
}

/**
 * 检测 json 文本缩进
 * @param content json 文本
 * @returns 格式化选项
 */
export function detectIndentation(content: string): FormattingOptions {
  const lines = content.split(/\r?\n/)
  for (const line of lines) {
    const match = line.match(/^(\s+)\S/)
    if (match) {
      const indent = match[1]
      return {
        insertSpaces: indent.includes(' '),
        tabSize: indent.includes(' ') ? indent.length : 2,
      }
    }
  }
  return {
    insertSpaces: true,
    tabSize: 2,
  }
}

export function toArray<T>(array?: T | T[]): T[] {
  array = array ?? []
  return Array.isArray(array) ? array : [array]
}

/**
 * 获取相对路径
 * @param path 文件路径
 * @param workspace 工作区路径
 * @returns 相对路径
 */
export function normalizePath(path: string, workspace: string): string {
  // 统一使用正斜杠
  path = path.replace(/\\/g, '/')
  workspace = workspace.replace(/\\/g, '/')

  // 移除工作区前缀
  if (path.startsWith(workspace))
    path = path.replace(workspace, '')

  // 清理首尾的斜杠
  return path.replace(/^\/+|\/+$/g, '')
}
