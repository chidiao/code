<script setup lang="ts">
const form = ref({ email: '', password: '', remember: true })
const loading = ref(false)

async function submit() {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  loading.value = false
}
</script>

<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
    <div class="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl" />
    <div class="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />

    <div class="relative w-full max-w-sm">
      <div class="mb-8 text-center">
        <div class="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-sky-500 text-lg font-bold text-white">
          S
        </div>
        <h1 class="text-xl font-semibold text-white">登录 Code</h1>
        <p class="mt-1 text-sm text-slate-400">欢迎回来，请输入账号信息</p>
      </div>

      <form class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur" @submit.prevent="submit">
        <label class="mb-1.5 block text-xs font-medium text-slate-300">邮箱</label>
        <input
          v-model="form.email"
          type="email"
          required
          placeholder="you@example.com"
          class="mb-4 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-brand-400"
        />

        <label class="mb-1.5 block text-xs font-medium text-slate-300">密码</label>
        <input
          v-model="form.password"
          type="password"
          required
          placeholder="••••••••"
          class="mb-5 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-brand-400"
        />

        <div class="mb-5 flex items-center justify-between text-xs text-slate-300">
          <label class="flex items-center gap-1.5">
            <input v-model="form.remember" type="checkbox" class="accent-brand-500" />
            记住我
          </label>
          <a href="#" class="hover:text-white">忘记密码？</a>
        </div>

        <button
          type="submit"
          class="h-11 w-full rounded-xl bg-gradient-to-r from-brand-500 to-sky-500 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          :disabled="loading"
        >
          {{ loading ? '登录中…' : '登 录' }}
        </button>
      </form>

      <p class="mt-6 text-center text-xs text-slate-500">
        还没有账号？
        <a href="#" class="text-slate-300 hover:text-white">立即注册</a>
      </p>
    </div>
  </div>
</template>