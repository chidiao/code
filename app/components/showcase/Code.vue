<script setup lang="ts">
import { getSource, sliceLines } from '~/composables/useSource'
import type { Highlighter } from 'shiki'

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = import('shiki').then(({ createHighlighter }) =>
      createHighlighter({
        themes: ['one-dark-pro'],
        langs: ['vue', 'typescript', 'javascript', 'css', 'html', 'json', 'markdown'],
      }),
    )
  }
  return highlighterPromise
}

const props = defineProps<{
  file?: string
  source?: string
  lines?: [number, number]
  lang?: string
  label?: string
}>()

const resolved = computed(() => {
  let name = props.file ?? ''
  let full = props.source
  if (full === undefined && props.file) {
    const src = getSource(props.file)
    if (src) {
      name = src.name
      full = src.content
    }
  }
  return full === undefined ? undefined : { name, full }
})

const code = computed(() => {
  if (!resolved.value) return ''
  return sliceLines(resolved.value.full, props.lines?.[0], props.lines?.[1])
})

const langMap: Record<string, string> = {
  vue: 'vue',
  ts: 'typescript',
  js: 'javascript',
  md: 'markdown',
  css: 'css',
  html: 'html',
  json: 'json',
}

const lang = computed(() => {
  const ext = (resolved.value?.name ?? '').split('.').pop() ?? ''
  return props.lang ?? langMap[ext] ?? 'text'
})

const highlighted = ref('')
const copied = ref(false)

async function render() {
  if (!code.value) {
    highlighted.value = ''
    return
  }
  try {
    const highlighter = await getHighlighter()
    let lineNo = 0
    highlighted.value = highlighter.codeToHtml(code.value, { lang: lang.value, theme: 'one-dark-pro' })
    highlighted.value = highlighted.value.replace(/<\/span>\n<span class="line">/g, '</span><span class="line">')
    highlighted.value = highlighted.value.replace(/<span class="line">/g, () => {
      lineNo += 1
      return `<span class="line"><span class="ln">${lineNo}</span>`
    })
  } catch {
    highlighted.value = ''
  }
}

watch(code, render, { immediate: true })

onBeforeUnmount(() => {
  highlighted.value = ''
})

async function copy() {
  await navigator.clipboard.writeText(code.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
  <section class="card overflow-hidden">
    <div class="flex items-center gap-3 border-b border-slate-700 bg-[#282c34] px-4 py-2">
      <span class="text-xs font-medium text-slate-300">{{ label ?? resolved?.name }}</span>
      <div class="flex-1" />
      <button type="button" class="btn-ghost flex items-center gap-1.5 px-2 py-1 text-xs text-slate-300" @click="copy">
        <span :class="copied ? 'i-lucide-check' : 'i-lucide-copy'" class="text-sm" />
        {{ copied ? '已复制' : '复制' }}
      </button>
    </div>

    <div class="code-scroll max-h-150 overflow-auto bg-[#282c34] text-[13px]">
      <template v-if="resolved">
        <div v-html="highlighted" class="code-body" />
      </template>
      <p v-else class="p-4 text-xs text-slate-400">未找到文件：{{ file }}</p>
    </div>
  </section>
</template>

<style scoped>
.code-body :deep(.shiki) {
  background: transparent !important;
  padding: 8px 16px 16px 0;
  overflow: visible;
  line-height: 1.7;
}
.code-body :deep(.shiki code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.7;
}
.code-body :deep(.shiki .line) {
  display: block;
  width: max-content;
  min-width: 100%;
  min-height: 1em;
  padding-right: 16px;
}
.code-body :deep(.shiki .ln) {
  user-select: none;
  display: inline-block;
  width: 2.6em;
  margin-right: 1.2em;
  padding-left: 16px;
  text-align: right;
  color: #4b5263;
}
</style>