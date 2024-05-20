// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === 'development' },
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
  runtimeConfig: {
    public: {
      baseUrl: 'http://homeserver:3000',
    },
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/',
      callback: '/confirm',
    },
  },
})