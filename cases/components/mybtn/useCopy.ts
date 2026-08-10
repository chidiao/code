/**
 * useCopy —— 把「复制 + 正反馈」逻辑从按钮组件里解耦出来的独立 Hook。
 * - 数据源用「函数返回字符串」，天然支持响应式取值（ref / computed / 普通值）；
 * - 与 UI 无关：任意组件组合它，就能获得一键复制与「已复制」状态回弹能力。
 */
export function useCopy(textSource: () => string, resetDelay = 1600) {
  const copied = ref(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  async function copy() {
    const text = textSource()
    let done = false

    // 首选 Clipboard API（需安全上下文）
    try {
      await navigator.clipboard.writeText(text)
      done = true
    } catch {
      done = false
    }

    // 降级方案：隐藏 textarea + execCommand
    if (!done) {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
    }

    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => (copied.value = false), resetDelay)
  }

  function reset() {
    copied.value = false
  }

  onBeforeUnmount(() => clearTimeout(timer))

  return { copied, copy, reset }
}