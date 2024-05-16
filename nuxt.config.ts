// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/supabase",
    "nuxt-icon",
    "@nuxt/eslint",
    "@pinia/nuxt"
  ],
  eslint: {
    config: {
      stylistic: true
    }
  },
  supabase: {
    redirect: false,
    url: import.meta.env.NUXT_SUPABASE_URL,
    key: import.meta.env.NUXT_SUPABASE_KEY,
    redirectOptions: {
      login: '/',
      callback: '/confirm',
    },
  },
})