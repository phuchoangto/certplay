// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/supabase",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@nuxtjs/kinde",
    "nuxt-icon"
  ],
  eslint: {
    config: {
      stylistic: true
    }
  },
  runtimeConfig: {
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/',
      callback: '/confirm',
    },
  },
})