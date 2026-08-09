interface PicsumPhoto {
  id: string
  author: string
}

const API = 'https://picsum.photos/v2/list'
const ROWS = 3

export const imgUrl = (id: string) => `https://picsum.photos/id/${id}/600/450`

function columnsFor(width: number) {
  return width >= 1024 ? 4 : width >= 640 ? 3 : 2
}

export function usePicsum() {
  const width = ref(typeof window === 'undefined' ? 1280 : window.innerWidth)
  const columns = computed(() => columnsFor(width.value))
  const images = ref<PicsumPhoto[]>([])
  const page = ref(0)
  const loading = ref(false)
  const error = ref('')
  const copiedId = ref<string | null>(null)

  let timer: ReturnType<typeof setTimeout> | undefined
  let resizeTimer: ReturnType<typeof setTimeout> | undefined

  async function load() {
    loading.value = true
    error.value = ''
    const p = Math.floor(Math.random() * 90) + 1
    const limit = columns.value * ROWS
    try {
      const res = await fetch(`${API}?page=${p}&limit=${limit}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      images.value = await res.json()
      page.value = p
    } catch (e) {
      error.value = e instanceof Error ? e.message : '请求失败'
    } finally {
      loading.value = false
    }
  }

  function adapt() {
    width.value = window.innerWidth
    if (columnsFor(width.value) !== columns.value) load()
  }

  function onResize() {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(adapt, 200)
  }

  async function copy(id: string) {
    const url = imgUrl(id)
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const input = document.createElement('textarea')
      input.value = url
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input.remove()
    }
    copiedId.value = id
    clearTimeout(timer)
    timer = setTimeout(() => (copiedId.value = null), 1500)
  }

  onMounted(() => {
    load()
    window.addEventListener('resize', onResize)
  })

  onUnmounted(() => {
    clearTimeout(timer)
    clearTimeout(resizeTimer)
    window.removeEventListener('resize', onResize)
  })

  return { columns, images, page, loading, error, copiedId, load, copy, imgUrl }
}