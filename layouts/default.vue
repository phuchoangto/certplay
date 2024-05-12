<script setup lang="ts">
import { TooltipProvider } from '@/components/ui/tooltip'
</script>

<template>
    <TooltipProvider>
  <div>
      <slot />
  </div>
</TooltipProvider>

</template>