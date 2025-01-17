#!/usr/bin/env node

'use strict'

import { Iconify } from '../core'
/**
 * 初始化
 */
const handle = new Iconify(undefined)

/**
 * 转换图标
 */
handle.toConvert()

/**
 * 加载图标
 */
handle.toLoad()

/**
 * 生成 Iconify IntelliSense 配置
 */
handle.toIntelliSense()
