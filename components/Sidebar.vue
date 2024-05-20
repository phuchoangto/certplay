<script lang="ts" setup>
import { Triangle, SquareTerminal, Search } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { items } from '@/data/nav'
</script>

<template>
  <div class="hidden border-r md:block">
    <div class="flex items-center justify-center border-b h-[60px]">
      <Button variant="outline" size="icon" aria-label="Home">
        <Triangle class="size-5 fill-foreground" />
      </Button>
    </div>
    <div class="flex-1">
      <nav class="grid gap-1 p-2 justify-center">
        <nuxt-link class="rounded-lg" active-class="bg-muted" v-for="item in items" :to="item.href">
          <Button variant="ghost" size="icon" :area-label="item.label">
            <component :is="item.icon" class="size-5" />
          </Button>
        </nuxt-link>
      </nav>
    </div>
  </div>
</template>