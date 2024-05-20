<script setup lang="ts">
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toast'
</script>

<template>
  <TooltipProvider>
    <Toaster />
    <div class="grid min-h-screen w-full md:grid-cols-[60px_1fr] lg:grid-cols-[60px_1fr]">
      <Sidebar />
      <slot />
    </div>
  </TooltipProvider>

</template>