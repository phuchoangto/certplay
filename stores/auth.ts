import { defineStore } from 'pinia'

const user = useSupabaseUser()
const { auth } = useSupabaseClient()

export interface User {
  id: string
  email: string
  name: string
}

const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

export const useMyAuthStore = defineStore('authStore', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async signInWithOAuth(provider: 'github') {
      await auth.signInWithOAuth({provider, options: { redirectTo }})
    },
    async signOut() {
      await auth.signOut()
    },
    async getProfile() {
      const { data, error } = await useFetch('/api/me')
      if (error) {
        throw error
      }
      console.log(data)
    }
  },
})