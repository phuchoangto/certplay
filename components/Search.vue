<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
const search = defineModel({
  type: String,
  required: true,
})
</script>

<template>
  <div class="relative w-full max-w-sm items-center ml-auto gap-1.5 text-sm">
    <Input id="search" type="text" placeholder="Search" class="pl-10" v-model="search" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <Search class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>