<script setup lang="ts">
import { Bell, SquareTerminal, CircleX, LoaderCircle, CircleUser, Home, LineChart, Menu, Package, Package2, Search, ShoppingCart, Users, Triangle } from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ref } from 'vue'
import { Skeleton } from '@/components/ui/skeleton'

const { data, pending, error } = await useFetch<string[]>('/api/exams', {
  lazy: true,
})

const search = ref('')

const exams = computed(() => {
  if (!search.value || !data.value) {
    return data.value || []
  }
  return data.value.filter((exam) =>
    exam.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<template>
  <div class="flex flex-col">
    <Header>
      <form>
        <div class="relative">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search products..." v-model="search"
            class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3" />
        </div>
      </form>
    </Header>
    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6" :class="{ 'justify-center': exams.length === 0 }">
      <div class="grid gap-4 md:grid-cols-2 lg:gap-6 lg:grid-cols-3" :class="{ 'hidden': exams.length === 0 }">
        <ExamList :exams="exams" :search="search" />
      </div>
      <div class="flex flex-col items-center justify-center flex-1 gap-2" v-if="exams.length === 0">
        <CircleX class="h-12 w-12 text-muted-foreground" />
        <h2 class="text-center text-lg font-semibold text-muted-foreground">
          No exams found
        </h2>
      </div>
    </main>
  </div>
</template>